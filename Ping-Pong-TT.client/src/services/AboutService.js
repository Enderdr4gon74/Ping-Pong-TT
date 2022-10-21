import { AppState } from "../AppState.js"

class AboutService {
  async setMessage(num) {
    AppState.aboutMessage = num
  }

  toggleRule(title) {
    console.log(title)
    const altRule = {...AppState.altRules2.filter(r => r.title == title)}
    console.log(altRule)
  }
}

export const aboutService = new AboutService()