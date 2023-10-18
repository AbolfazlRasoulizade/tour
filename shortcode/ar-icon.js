const {readFile} = require('node:fs/promises');

async function arIcon(iconName, customClass = '') {
  let icon;

  icon = await readFile(`node_modules/@alwatr/icon-set-material/svg/outline/${iconName}.svg`, 'utf8');

  return `<div class="text-blue-500 h-6 w-6 box-content align-middle self-center grow-0 shrink-0 [contain:size_layout_paint_style] [&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current ${customClass}">${icon}</div>`;
}

module.exports = {arIcon};
