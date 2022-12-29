# VIZ - AWS Diagramming Made Easy 

A front-end application to visualize AWS infustructures.

## Live production example:
<img width="1792" alt="image" src="https://user-images.githubusercontent.com/47722603/209884359-46999e5d-eacd-4c35-8a40-a8451a782301.png">

Website: [https://viz.nathanluong.me](https://viz.nathanluong.me)

## Tech-stack
1. Healily used React packages/framework:
    1. react-flow
    2. dom-to-image
    3. react-redux
    4. react-icons
2. Flask [DIP]
3. Firestore [DIP]

## In-coming User Features
1. Export to .viz files format.
2. Support cloud-based authentication and personalization.
3. Keyboard Shortcuts and tools.
4. [Maybe] Export to native CloudFormation or Terraform.

## Optimization TODOs
1. Migrate pngs usage to svgs
2. Lazy loading icons on sidebar
3. Memoize certain components when react-flow changes
4. ...

## Set-up guide
```
git clone
yarn
yarn start
```
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes. You may also see any lint errors in the console.
