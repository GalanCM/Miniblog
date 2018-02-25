/**
 * Blog component: describes the layout of a single blog post.
 * props includes the object `post`, the data for the post to be rendered
 */

import React from "react";
import { render } from "react-dom";
import Radium from "radium";

@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      article: {
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto 20px",
        fontFamily: "Lato, Arial, sans-serif",
        fontSize: "15px",
        lineHeight: "200%"
      },
      header: {
        fontFamily: "Raleway, Helvetica, sans-serif",
        fontWeight: 700,
        fontSize: "30px",
        margin: "0px 0px 0px -15px"
      },
      date: {
        fontSize: "18px",
        fontWeight: 200,
        opacity: 0.6,
        marginBottom: "-6px"
      }
    };
  }

  render() {
    return (
      <article style={this.styles.article}>
        {/* date and time */}
        <h1 style={this.styles.header}>
          <div style={this.styles.date}>
            {this.props.details.date.toLocaleDateString("en-US")}
          </div>
          {this.props.details.title}
        </h1>

        {/* body of the post */}
        <main
          dangerouslySetInnerHTML={{ __html: this.props.details.body }} // HTML for body was defined in (now rendered) Markdown.
        />
      </article>
    );
  }
}
