# Описание проекта

Данный проект является тестовым задание для организации "Технологии защиты, ООО (проект [Pryaniky.com](https://pryaniky.com/))".
Ссылка на [задание](https://docs.google.com/document/d/14NeOt5w16HgZKSJIIg-Kh9AiclFhX9Oq/edit?clckid=f5ec8820)

# Техническая часть проекта

Проект создан с помощью [Vite](https://vitejs.dev/).
Стек используемых технологий: React + TypeScript.
При создании были использованы такие библиотеки, как: [Material UI](https://mui.com/), [Axios](https://axios-http.com/), [react-hook-form](https://react-hook-form.com/).
Был использован стейт-менеджер [Redux Toolkit](https://redux-toolkit.js.org/).
Версия ноды - v18.17.1.
При написании была использована архитектура [Feature-Sliced Design](https://feature-sliced.design/ru/).

## Available Scripts

### `npm run dev`

Запускает приложение в режиме разработки командой npm start.

### `npm run build`

Запускает приложение в режиме продакшена по команде npm run build

### `npm run lint`

В приложении настроен линтер. Его можно запустить с помощью команды npm run lint.

# Подробное описание, как запустить приложение при разных сценариях:

Откройте терминал в папке проекта и запустите команду для скачивания все библиотек:

```
npm i
```

После выполните команду для запуска приложения:

```
npm run dev
```

Если при работе приложение натыкается на ошибку нарушения политики CORS, то сделайте следующее:

1. Зайдите в файл src/Shared/API/api.ts. Закомментируйте строку 5 (export const HOST = "https://test.v5.pryaniky.com"). Раскомментируйте строку 4 (export const HOST = "http://localhost:5000"). Сохраните изменения.
2. Зайдите в папку cors-bypass-server и запустите сервис, который там лежит, как указано в README.md. Проследите, что сервис запустился на 5000 порту!
3. Параллельно с сервисом запустите приложение, используя команду для запуска

```
npm run dev
```
