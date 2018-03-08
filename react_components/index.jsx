/**
 * The index component for the blog. Mounts the other components.
 */

import React from "react";
import { render } from "react-dom";
import { StyleRoot } from "radium";

// jsx components
import BlogPost from "./blog_post.jsx";
import CodeViewer from "./code_viewer.jsx";

// utilities shared between blog implementations
import Utility from "../shared/utility.js";

// normalize the css between browsers
import "normalize.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    let blogs = Utility.fetchBlogs();
    blogs.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      } else if (a.date < b.date) {
        return 1;
      } else {
        return 0;
      }
    });
    this.state = {
      blog_posts: blogs // An array of blog posts.
    };

    // css in js with Radium
    this.styles = {
      header: {
        fontSize: "40px",
        fontWeight: "400",
        fontFamily: "Raleway, Helvetica, sans-serif",
        color: "white",
        backgroundColor: "#001b36",
        padding: "3px 10px 1px",
        borderBottom: "6px solid #820a0a",
        marginTop: "-7px"
      },
      title: {
        display: "inline-block",
        transform: "translateY(10px)",
        textShadow: "1px 2px 1px rgba(0,0,0,0.1)"
      },

      version: {
        float: "right",
        transformOrigin: "center bottom",
        transform: "translateY(16px)",
        fontSize: "22px",

        "@media screen and (orientation: portrait)": {
          fontSize: "18px",
          transform: "translateY(21px)"
        },

        selector: {
          opacity: 0.5,
          fontWeight: 200,
          fontSize: "32px",
          letterSpacing: "4px",
          transition: "0.7s opacity ease-out",

          ":hover": {
            opacity: 1
          },

          "@media screen and (orientation: portrait)": {
            fontSize: "28px"
          }
        }
      },

      spacer: {
        backgroundColor: '#aaaabb',
        height: '20px'
      },

      intro: {
        padding: "0 50px",
        display: "flex",
        margin: "60px 0",

        "@media screen and (orientation: portrait)": {
          flexDirection: "column",
          padding: "0 30px"
        }
      },

      introHeader: {
        textAlign: "right",
        margin: "-7px 30px 0 0",
        width: "30%",
        minWidth: "250px",
        fontWeight: 700,
        lineHeight: 1.2,

        "@media screen and (orientation: portrait)": {
          width: "100%",
          textAlign: "right",
          margin: "-30px 0 20px"
        }
      },

      introText: {
        margin: "-16px 0"
      },

      main: {
        padding: "0px 30px",
        display: "flex",
        flexDirection: "column"
      }
    };
  }

  render() {
    return (
      <StyleRoot>
        {/* page header */}
        <nav style={this.styles.header}>
          <span style={this.styles.title}>Miniblog</span>
          <span style={this.styles.version}>
            v.
            <span style={this.styles.version.selector}>React</span>
          </span>
        </nav>

        <div style={this.styles.spacer}></div>

        {/* code viewer */}
        <CodeViewer />

        {/* intro */}
        <section style={this.styles.intro}>
          <header style={this.styles.introHeader}>
            <h1>Welcome to my code sample</h1>
          </header>
          <div style={this.styles.introText}>
            <p>
              This Miniblog is intended for potential clients and employers who
              want proof of my coding ability. I respect your time, so rather
              than give you a complex app that would take time to parse, I built
              this as a simple, easy-to skim codebase that would give you a good
              baseline of my skill across multiple frameworks. As of right now,
              there is only this React version, but I plan to replicate it in
              Vue, Angular, Ember, and Svelte.
            </p>
            <p>
              If you would like to see a real-world (if still simple) example of
              my work, also with code, please check out{" "}
              <a href="https://www.galan-montgomery.com">my portfolio</a>.
            </p>
          </div>
        </section>

        {/* blog posts */}
        <main style={this.styles.main}>
          {this.state.blog_posts.map((post, i) => {
            return <BlogPost details={post} key={i} />;
          })}
        </main>
      </StyleRoot>
    );
  }
}

render(<App />, document.getElementById("app"));
