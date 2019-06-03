import React, { Component } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { OrganizationChart } from "primereact/organizationchart";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
      data1: [
        {
          label: "Meet the team",
          type: "person",
          className: "p-person",
          expanded: true,
          data: {
            name: "Premium Cinema"
          },
          children: [
            {
              label: "Team leader",
              type: "person",
              className: "p-person",
              expanded: true,
              data: {
                name: "Michał Nowakowski",
                avatar:
                  "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/32207299_2028409867230873_7274574267457470464_n.jpg?_nc_cat=104&_nc_ht=scontent-waw1-1.xx&oh=4e61f7bb584dab41a95b83cab9306abd&oe=5D85FB10"
              },
              children: [
                {
                  label: "Development",
                  className: "department-cto",
                  expanded: true,
                  children: [
                    {
                      label: "Front End",
                      className: "department-cto"
                    },
                    {
                      label: "Back End",
                      className: "department-cto"
                    }
                  ]
                },
                {
                  label: "QA",
                  className: "department-cto"
                }
              ]
            },
            {
              label: "UI/UX",
              type: "person",
              className: "p-person",
              expanded: true,
              data: {
                name: "Robert Leśniak",
                avatar:
                  "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/26167175_1670694516333057_7967421440933436580_n.jpg?_nc_cat=102&_nc_ht=scontent-waw1-1.xx&oh=b9e49a2929ee704dcdb3d8ced4eaee4b&oe=5D8CCE80"
              },
              children: [
                {
                  label: "Development",
                  className: "department-cto",
                  expanded: true,
                  children: [
                    {
                      label: "Front End",
                      className: "department-cto"
                    }
                  ]
                }
              ]
            },
            {
              label: "API Creator",
              type: "person",
              className: "p-person",
              expanded: true,
              data: {
                name: "Mariusz Owczarski",
                avatar:
                  "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-1/22730218_868193800016140_6108357381089020353_n.jpg?_nc_cat=105&_nc_ht=scontent-waw1-1.xx&oh=37191a77b23a5748510774c0479d59d7&oe=5D8C4B58"
              },
              children: [
                {
                  label: "Development",
                  className: "department-cto",
                  expanded: true,
                  children: [
                    {
                      label: "Back End",
                      className: "department-cto"
                    }
                  ]
                },
                {
                  label: "UI/UX",
                  className: "department-cto"
                }
              ]
            },
            {
              label: "Use cases",
              type: "person",
              className: "p-person",
              expanded: true,
              data: {
                name: "Nelli Pashkovska",
                avatar:
                  "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/44164460_919899234874370_7253775780952408064_n.jpg?_nc_cat=100&_nc_ht=scontent-waw1-1.xx&oh=5b933f86b174ad34f9da4f1274b59d32&oe=5D853070"
              },
              children: [
                {
                  label: "Development",
                  className: "department-cto",
                  expanded: true,
                  children: [
                    {
                      label: "Prototype",
                      className: "department-cto"
                    },
                    {
                      label: "Use case diagram",
                      className: "department-cto"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      selection: []
    };

    this.nodeTemplate = this.nodeTemplate.bind(this);
  }

  nodeTemplate(node) {
    if (node.type === "person") {
      return (
        <div>
          <div
            className="node-header"
            style={{ fontSize: "25px", fontWeight: "bold" }}
          >
            {node.label}
          </div>
          <div className="node-content">
            <img
              alt={node.data.avatar}
              src={node.data.avatar}
              style={{ width: "70px" }}
            />
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              {node.data.name}
            </div>
          </div>
        </div>
      );
    }

    if (node.type === "department") {
      return (
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>{node.label}</div>
      );
    }
  }

  render() {
    return (
      <div
        className="col-md-12 text-center"
        style={{ marginTop: "50px", background: "white" }}
      >
        <img
          src={require("../../images/cinema.svg.png")}
          alt=""
          className="img-fluid"
          style={{ color: "white", transform: "scale(0.6, 0.6)" }}
        />
        <h1 className="display-4">
          Who we are ? <i className="fa fa-video" />
        </h1>
        <p className="lead" style={{ fontSize: "22px" }}>
          We are Premium Cinema, who is involved with the most famous movie
          providers all around the world. Our app is used by the most famous
          brands globally.
        </p>
        <OverlayPanel
          ref={el => (this.op = el)}
          showCloseIcon={true}
          style={{
            backgroundColor: "White",
            borderStyle: "Solid",
            borderColor: "#0051a5",
            borderRadius: "30px",
            alignItems: "center",
            alignSelf: "center",
            marginLeft: "80px"
          }}
          dismissable={true}
          for="btn"
        >
          <div className="col md-12">
            <OrganizationChart
              value={this.state.data1}
              nodeTemplate={this.nodeTemplate}
              selection={this.state.selection}
              selectionMode="multiple"
              onSelectionChange={event =>
                this.setState({ selection: event.data })
              }
              className="company"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            />
          </div>
        </OverlayPanel>
        <button
          className="btn btn-lg btn-outline-light mr-2"
          style={{
            backgroundColor: "#0051a5",
            marginLeft: "5px",
            marginBottom: "5px",
            border: "none",
            marginTop: "5px",
            fontWeight: "bold"
          }}
          label="toggle"
          onClick={e => this.op.toggle(e)}
          id="btn"
        >
          Check our awesome team
        </button>

        <h1 className="display-4" style={{}}>
          Our goal is to:
        </h1>
        <p className="lead" style={{ fontSize: "22px" }}>
          <li className="">provide the best possible user experience</li>
        </p>
        <p className="lead" style={{ fontSize: "22px" }}>
          <li className="">best app performence possible</li>
        </p>
        <p className="lead" style={{ fontSize: "22px" }}>
          <li className="">make our customers happy as much as possible</li>
        </p>
        <p className="lead" style={{ fontSize: "22px" }}>
          <li className="">make customers able leave their opinions</li>
        </p>
        <h1 className="display-4" style={{}}>
          Contact us using one of these below
        </h1>
        <p className="lead" style={{ fontSize: "22px" }}>
          Email: ourmail@premiumCinema.com
        </p>
        <p className="lead" style={{ fontSize: "22px", marginBottom: "5px" }}>
          Phone: +48 666666666
        </p>
      </div>
    );
  }
}
export default AboutUs;
