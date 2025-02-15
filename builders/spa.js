module.exports = async function spa(folder = 'spa') {
  process.env.NULLSTACK_ENVIRONMENT_MODE = 'spa';

  const dir = process.cwd();
  const application = require(`${dir}/.production/server`).default
  const { existsSync, mkdirSync, writeFileSync, copySync, rmSync } = require('fs-extra');
  const path = `${dir}/${folder}`;

  async function copy(url, file) {
    console.log(` ⚙️  ${file || url}`)
    const content = await application.server.prerender(url);
    const target = `${dir}/${folder}${file || url}`
    writeFileSync(target, content)
  }

  function filter(src, dest) {
    return dest.endsWith(folder) || (src.includes('client') && !src.includes('.txt'))
  }

  console.log()
  if (existsSync(path)) {
    rmSync(path, { recursive: true });
  }
  mkdirSync(path)
  console.log(` ⚙️  /public/`)
  copySync(`${dir}/public`, path);
  await copy('/', '/index.html')
  console.log(` ⚙️  /.production/`)
  copySync(`${dir}/.production`, path, { filter })
  await copy(`/manifest.json`)
  await copy(`/service-worker.js`)
  console.log()

  console.log('\x1b[36m%s\x1b[0m', ` ✅️ ${application.project.name} is ready at ${folder}\n`);
  process.exit()
}