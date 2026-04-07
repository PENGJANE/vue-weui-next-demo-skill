#!/usr/bin/env node
/**
 * WeUI HTML 原型截图脚本
 * 对 HTML 文件中每个带 data-component 属性的区块逐一截图，
 * 并生成技术文档（*_tech.html），包含截图 + HTML + Vue 代码对照。
 *
 * 依赖：npm install puppeteer
 *
 * 用法：
 *   node screenshot.js <input.html>
 *
 * 输出：
 *   <name>_screenshots/    每个组件的截图 PNG
 *   <name>_tech.html       技术文档（截图 + 代码对照）
 */

const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

async function run() {
  const inputFile = process.argv[2]
  if (!inputFile) {
    console.error('用法: node screenshot.js <input.html>')
    process.exit(1)
  }

  const inputPath = path.resolve(inputFile)
  const baseName = path.basename(inputFile, '.html')
  const dir = path.dirname(inputPath)
  const screenshotDir = path.join(dir, `${baseName}_screenshots`)
  const techOutputPath = path.join(dir, `${baseName}_tech.html`)

  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir)

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 }) // iPhone 14 尺寸

  await page.goto(`file://${inputPath}`, { waitUntil: 'networkidle0' })

  // 取出所有 data-component 区块的信息
  const components = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-component]')).map(el => ({
      name: el.getAttribute('data-component'),
      vueCode: el.getAttribute('data-vue') || '',
      htmlCode: el.outerHTML,
    }))
  })

  if (components.length === 0) {
    console.warn('⚠️  未找到任何 data-component 区块，请检查 HTML 是否符合规范。')
    await browser.close()
    process.exit(1)
  }

  console.log(`找到 ${components.length} 个组件区块，开始截图...\n`)

  const screenshotResults = []

  for (const comp of components) {
    const safeName = comp.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5_-]/g, '_')
    const screenshotFile = path.join(screenshotDir, `${safeName}.png`)
    const screenshotRelPath = `./${baseName}_screenshots/${safeName}.png`

    // 高亮当前区块，其余区块隐藏
    await page.evaluate((compName) => {
      document.querySelectorAll('[data-component]').forEach(el => {
        el.style.display = el.getAttribute('data-component') === compName ? '' : 'none'
      })
    }, comp.name)

    const el = await page.$(`[data-component="${comp.name}"]`)
    if (el) {
      await el.screenshot({ path: screenshotFile })
      console.log(`✅  ${comp.name} → ${screenshotFile}`)
    }

    // 恢复显示
    await page.evaluate(() => {
      document.querySelectorAll('[data-component]').forEach(el => {
        el.style.display = ''
      })
    })

    screenshotResults.push({
      name: comp.name,
      screenshotRelPath,
      vueCode: comp.vueCode,
      htmlCode: comp.htmlCode,
    })
  }

  await browser.close()

  // 生成技术文档
  const techHtml = generateTechDoc(baseName, screenshotResults)
  fs.writeFileSync(techOutputPath, techHtml, 'utf-8')
  console.log(`\n📄  技术文档已生成: ${techOutputPath}`)
}

function generateTechDoc(pageName, components) {
  const rows = components.map(comp => {
    const escapedHtml = escapeHtml(formatHtml(comp.htmlCode))
    const escapedVue = escapeHtml(comp.vueCode)
    return `
    <section class="component-section">
      <h2 class="component-title">${escapeHtml(comp.name)}</h2>
      <div class="component-body">
        <div class="preview-col">
          <div class="col-label">效果预览</div>
          <img src="${comp.screenshotRelPath}" alt="${escapeHtml(comp.name)}" class="screenshot" />
        </div>
        <div class="code-col">
          <div class="code-block">
            <div class="col-label">HTML 结构</div>
            <pre><code class="language-html">${escapedHtml}</code></pre>
          </div>
          <div class="code-block">
            <div class="col-label">Vue 组件写法</div>
            <pre><code class="language-vue">${escapedVue}</code></pre>
          </div>
        </div>
      </div>
    </section>`
  }).join('\n')

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(pageName)} — 技术文档</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif; background: #f5f5f5; color: #333; }
    .page-header { background: #07c160; color: #fff; padding: 24px 40px; }
    .page-header h1 { margin: 0; font-size: 22px; }
    .page-header p { margin: 6px 0 0; opacity: .8; font-size: 13px; }
    .page-body { max-width: 1100px; margin: 32px auto; padding: 0 24px; }
    .component-section { background: #fff; border-radius: 12px; margin-bottom: 28px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
    .component-title { margin: 0; padding: 16px 24px; font-size: 15px; font-weight: 600; background: #fafafa; border-bottom: 1px solid #f0f0f0; color: #111; }
    .component-body { display: flex; gap: 0; }
    .preview-col { width: 220px; flex-shrink: 0; padding: 20px; border-right: 1px solid #f0f0f0; display: flex; flex-direction: column; align-items: center; }
    .code-col { flex: 1; padding: 16px 20px; display: flex; flex-direction: column; gap: 16px; min-width: 0; }
    .col-label { font-size: 11px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 8px; }
    .screenshot { width: 100%; max-width: 200px; border-radius: 8px; border: 1px solid #eee; }
    .code-block pre { margin: 0; background: #1e1e1e; border-radius: 8px; padding: 14px 16px; overflow-x: auto; }
    .code-block code { font-family: 'JetBrains Mono', 'Fira Code', Menlo, monospace; font-size: 12.5px; line-height: 1.7; color: #d4d4d4; white-space: pre; }
    @media (max-width: 700px) {
      .component-body { flex-direction: column; }
      .preview-col { width: 100%; border-right: none; border-bottom: 1px solid #f0f0f0; }
    }
  </style>
</head>
<body>
  <div class="page-header">
    <h1>${escapeHtml(pageName)} — 技术文档</h1>
    <p>每个组件：效果截图 · HTML 结构 · Vue 写法对照</p>
  </div>
  <div class="page-body">
    ${rows}
  </div>
</body>
</html>`
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatHtml(html) {
  // 只保留 data-component 块内的内部内容，去掉外层 wrapper div
  const match = html.match(/^<div[^>]*>([\s\S]*)<\/div>$/)
  return match ? match[1].trim() : html
}

run().catch(err => {
  console.error('截图失败:', err)
  process.exit(1)
})
