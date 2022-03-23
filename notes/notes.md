npx create-next-app --help
npx create-next-app top-app --use-npm (-ts)
(
create empty file tsconfig.json
npm i -D typescript @types/react @types/node
)

eslint - стиль кода ts
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
add file .eslintrc.json

stylelint - стиль css
npm i -D stylelint stylelint-config-standard stylelint-order stylelint-order-config-standard
add file .stylelintrc.json
"stylelint": "stylelint \"**/*.css\" --fix",
enable stylelint in IDE settings

debug
npm i -D cross-env
"debug": "cross-env NODE_OPTIONS='--inspect' next dev"
https://stackoverflow.com/questions/54354389/how-does-one-debug-nextjs-react-apps-with-webstorm
https://www.jetbrains.com/help/webstorm/debugging-javascript-in-chrome.html
https://blog.jetbrains.com/webstorm/2018/01/how-to-debug-with-webstorm/


Head элементы могут переопределяться (использовать ключ, чтобы не переопределять)
Скринридеры могут не понять, что за язык, если он не указан в Document (lang)

Нижнее подчёркивание для _app и _document - это зарезервированное название в Next.js для переопределения шаблона всего документа и приложения.

add scss https://medium.com/nextjs/how-to-add-sass-scss-in-next-js-77a2b34f1ff3

https://www.figma.com/file/eHIyKZXUUtMf1BQiuv6tTA/%D0%9A%D1%83%D1%80%D1%81-2---NextJS?node-id=1%3A2



DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
ButtonHTMLAttributes <HTMLButtonElement>
React.ComponentProps<'button'>
https://coderoad.ru/58418950/%D0%92-%D1%87%D0%B5%D0%BC-%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-DetailedHTMLProps-%D0%B8-HTMLAttributes