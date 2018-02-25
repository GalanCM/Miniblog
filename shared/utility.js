/**
 * Utilities. A collection of tools to be shared between the various blog implementations.
 */

import marked from "marked"; // markdown converter
import Rx from "rxjs/Rx";

export default class {
  /**
   * Fetch data for all blog posts.
   * Posts are currently hard-coded, but the function is an abstraction, so a server-side api could be added at a later date.
   * @returns { { title: string, date: datetime, body: string, tags: string[] }[] }
   */
  static fetchBlogs() {
    return [
      {
        title: "Building a Miniblog in React",
        date: new Date("2/25/2018"),
        body: marked(
          // convert from markdown to HTML before returning
          `## Complex feelings about complexity

I have always had mixed feelings toward React.

On the one hand, I really appreciate it's focus. React does one thing — mapping JS components to the DOM — and it does it well. The approach to overall app structure is excellent, and it's innovation regarding state management and data flow (along with Redux) is undeniable. Plus, with much of the tooling left to the users, the React community is amongst the most creative I've seen.

However, I can help but feel that React tends to prefer clever solutions over ease-of-use. JSX, while powerful, can quickly become a chaotic mess to parse, pushing programmers to use increasingly atomic components just to keep the code legible.

Similarly, React doesn't seem to want to fully embrace reactivity, making it more difficult to share data between components (or even within components) than it needs to be. This pushes the developer towards a central store like Redux or MobX, even for very smaller apps. I nearly needed one here, and this app is tiny.

All that said, React is still my #2 framework. While I feel like it could be better, it still does the most important things well, and given its popularity, I anticipate using it a lot in the future.

__And speaking of the future__, I also took this opportunity to learn some new tools:

* __Radium:__ I typically prefer using CSS Modules with React, so I figured I'd try out one of the more popular 'CSS-in-JS' solutions. I'll say it wasn't bad, but I'll probably stick to CSS Modules in the future, given the choice. There are a wealth of existing tools that I can't use with Radium, and it's nice to be able to copy styles from the browser without reformatting.

* __RxJS:__ Honestly, I mostly just used it at a whim. I'd read up a bit on it recently, and when I encountered a situation where I needed to fetch multiple files via AJAX simultaneously, I thought it might be a good solution. I'm still not 100% sold on *functional* reactive programming yet, but I certainly plan on tinkering with it more in the future.

Next up: A miniblog in Vue, my #1 framework!`
        ),
        tags: ["react"]
      }
    ];
  }

  /**
   * Fetch the key code files requested by
   * @param {string[]} filenames An array of the files to fetch
   * @returns {RX.Observable} An RxJS Ajax observable that returns a list of response objects. I could have used multiple promises instead, but why not experiment with observables?
   */
  static fetchCode(filenames) {
    let base_observables = []; // for storing the observables before combinin them

    // add an AJAX observable for each requested file to the base_observables array
    for (let filename of filenames) {
      base_observables.push(
        Rx.Observable.ajax({
          url: filename,
          method: "GET",
          responseType: "text",
          createXHR: function() {
            return new XMLHttpRequest();
          }
        })
      );
    }

    // combine the observables so that a single .subscribe() can get the results for all of them.
    let files_observable = Rx.Observable.combineLatest(base_observables);

    return files_observable;
  }
}
