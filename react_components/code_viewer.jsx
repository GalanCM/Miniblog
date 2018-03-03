/**
 * View the code used by the blog.
 * Includes the button and modal.
 */
import React from "react";
import { render } from "react-dom";
import Radium from "radium";

import Utility from "../shared/utility.js";

@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false, // Whether or not to render the modal.
      files: {}, // {file_name: file contents}
      current_file: "react_components/index.jsx" // name of the file currently being displayed
    };

    this.styles = {
      wrapper: {
        display: "flex",
        flexDirection: "column"
      },
      showButton: {
        width: "90%",
        fontSize: "30px",
        border: "none",
        borderRadius: 0,
        color: "#eee",
        padding: "10px 0",
        fontWeight: 600,
        backgroundColor: "rgb(0, 64, 128)",
        margin: "10px auto 0",
        cursor: "pointer",
        boxShadow: "2px 2px 3px rgba(0,0,3,0.35 )",
        transition: "filter 0.2s ease-in",
        ":hover": { filter: "brightness(1.3)" }
      },
      modal: {
        position: "fixed",
        top: "0px",
        left: "0px",
        backgroundColor: "white",
        width: "calc( 100vw - 60px )",
        height: "calc( 100vh - 60px )",
        margin: "30px",
        borderRadius: "3px",
        boxShadow: "0px 0px 6px rgba(0,0,0,1)"
      },
      header: {
        backgroundColor: "#ddddee",
        display: "flex"
      },
      selectWrapper: {
        maxWidth: "calc(100% - 53px)"
      },
      selectLabel: {
        margin: "15px 0 -10px 15px",
        display: "inline-block",
        fontWeight: 600
      },
      fileSelect: {
        margin: "15px 0 10px 10px",
        maxWidth: "100%"
      },
      hideButton: {
        float: "right",
        padding: "0 10px 4px",
        fontSize: "30px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        color: "#555",
        transition: "color 0.2s ease-in",
        margin: "auto 0 auto auto",

        ":hover": { color: "#111" }
      },
      code: {
        whiteSpace: "pre",
        margin: "20px",
        padding: "10px",
        fontFamily: "Fira Mono, monospace",
        fontSize: "11px",
        borderRadius: "3px",
        backgroundColor: "#001b36",
        color: "#eee",
        height: "calc(100% - 90px)",
        overflow: "scroll"
      }
    };
  }

  componentDidMount() {
    // Get the code files from the server
    let code_observable = Utility.fetchCode([
      "react_components/index.jsx",
      "react_components/blog_post.jsx",
      "react_components/code_viewer.jsx",
      "shared/utility.js"
    ]);
    code_observable.subscribe(responses => {
      // subscripe the the observable ( equivalent to Promise.done() )
      for (let response of responses) {
        this.setState(prevState => ({
          files: {
            ...prevState.files,
            [response.request.url]: response.response
          }
        }));
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    // stop the <body> from scrolling when the modal is opened
    if (nextState.showModal === true) {
      document.querySelector("body").style["overflowY"] = "hidden";
    } else if (nextState.showModal === false) {
      document.querySelector("body").style["overflowY"] = "visible";
    }
  }

  render() {
    // template for the code modal
    let code_modal = (
      <section style={this.styles.modal}>
        <header style={this.styles.header}>
          {/* select for choosing the file to display */}
          <div style={this.styles.selectWrapper}>
            <span style={this.styles.selectLabel}>View file:</span>
            <select
              style={this.styles.fileSelect}
              value={this.state.current_file}
              onChange={event =>
                this.setState({ current_file: event.target.value })
              }
            >
              {Object.keys(this.state.files).map((name, i) => {
                return <option key={i}>{name}</option>;
              })}
            </select>
          </div>

          {/* close button */}
          <button
            style={this.styles.hideButton}
            onClick={event => this.setState({ showModal: false })}
            key={"hideButton"}
          >
            ✕
          </button>
        </header>

        {/* the code */}
        <div style={this.styles.code}>
          {this.state.files[this.state.current_file]}
        </div>
      </section>
    );

    return (
      <div style={this.styles.wrapper}>
        {/* Show Code button */}
        <button
          style={this.styles.showButton}
          onClick={event => this.setState({ showModal: true })}
          key={"showButton"}
        >
          Open Code Viewer
        </button>

        {/* the modal */}
        {this.state.showModal ? code_modal : ""}
      </div>
    );
  }
}
