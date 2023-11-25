import { showCurrentSection } from './utils.js'

const homePageSection = document.getElementById('home-page');

 export function showHome(){
    showCurrentSection(homePageSection);
}