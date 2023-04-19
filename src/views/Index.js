import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import CircularLoader from "components/Loaders/CircularLoader";
import { connect } from "react-redux";
import * as actions from "../redux/creators";

const Index = (props) => {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
  };

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);

  useEffect(() => {
    props.bpoGraphGetData(data);
    props.GBQGraphGetData(data);
    props.GSQGraphGetData(data);
  }, []);

  function chart() {
    let labels = [];
    let gdata = [];
    const newData =
      props.bpoGraph.bpoGraph.data?.length > 0
        ? props.bpoGraph?.bpoGraph?.data
        : [];
    for (const d of newData) {
      labels.push(d.month);
      gdata.push(d.sum);
    }

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Count",
          borderWidth: 1,
          backgroundColor: "rgba(94,114,228,.1)",
          borderColor: "rgb(94,114,228)",
          pointBorderColor: "rgb(94,114,228)",
          pointBackgroundColor: "rgb(94,114,228)",
          data: gdata,
        },
      ],
    });

    console.log(`labels`, labels, "gdata", gdata);
  }

  function chart2() {
    let labels = [];
    let gdata = [];
    const newData =
      props.GBQGraph.GBQGraph.data?.length > 0
        ? props.GBQGraph?.GBQGraph?.data
        : [];
    for (const d of newData) {
      labels.push(d.month);
      gdata.push(d.count);
    }

    setChartData2({
      labels: labels,
      datasets: [
        {
          label: "Count",
          borderWidth: 1,
          // backgroundColor: "rgba(94,114,228,.1)",
          // borderColor: "rgb(94,114,228)",
          // pointBorderColor: "rgb(94,114,228)",
          // pointBackgroundColor: "rgb(94,114,228)",
          data: gdata,
        },
      ],
    });

    console.log(`labels`, labels, "gdata", gdata);
  }

  function chart3() {
    let labels = [];
    let gdata = [];
    const newData =
      props.GBQGraph.GSQGraph.data?.length > 0
        ? props.GBQGraph?.GSQGraph?.data
        : [];
    for (const d of newData) {
      labels.push(d.month);
      gdata.push(d.sum);
    }

    setChartData3({
      labels: labels,
      datasets: [
        {
          label: "₹",
          borderWidth: 1,
          // backgroundColor: "rgba(94,114,228,.1)",
          // borderColor: "rgb(94,114,228)",
          // pointBorderColor: "rgb(94,114,228)",
          // pointBackgroundColor: "rgb(94,114,228)",
          data: gdata,
        },
      ],
    });

    console.log(`labels`, labels, "gdata", gdata);
  }
  useEffect(() => {
    chart();
    chart2();
    chart3();
  }, []);
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  console.log(`chartdata2`, chartData2);
  return (
    <>
      {/* <Header /> */}
      {/* Page content */}

      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Orders</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartData}
                    // data={chartExample1[chartExample1Data]}
                    options={{
                      maintainAspectRatio: false,
                      legend: {
                        display: false,
                        labels: { fontFamily: "Nunito Sans" },
                      },
                      scales: {
                        yAxes: [
                          {
                            stacked: true,
                            gridLines: { display: true },
                            ticks: {
                              beginAtZero: true,
                              fontFamily: "Nunito Sans",
                            },
                          },
                        ],
                        xAxes: [
                          {
                            gridLines: { display: true },
                            ticks: { fontFamily: "Nunito Sans" },
                          },
                        ],
                      },
                    }}
                    // options={chartExample1.options}
                    // getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Activities
                    </h6>
                    <h2 className="mb-0">Events</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartData2}
                    // data={chartExample2.data}
                    options={chartExample2.options}
                    // options={{
                    //   maintainAspectRatio: false,
                    //   legend: {
                    //     display: false,
                    //     labels: { fontFamily: "Nunito Sans" },
                    //   },
                    //   scales: {
                    //     yAxes: [
                    //       {
                    //         stacked: true,
                    //         gridLines: { display: true },
                    //         ticks: {
                    //           beginAtZero: true,
                    //           fontFamily: "Nunito Sans",
                    //         },
                    //       },
                    //     ],
                    //     xAxes: [
                    //       {
                    //         gridLines: { display: true },
                    //         ticks: { fontFamily: "Nunito Sans" },
                    //       },
                    //     ],
                    //   },
                    // }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Expenses
                    </h6>
                    {/* <h2 className="text-white mb-0"></h2> */}
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartData3}
                    // data={chartExample1[chartExample1Data]}
                    options={{
                      maintainAspectRatio: false,
                      legend: {
                        display: false,
                        labels: { fontFamily: "Nunito Sans" },
                      },
                      scales: {
                        yAxes: [
                          {
                            stacked: true,
                            gridLines: { display: true },
                            ticks: {
                              beginAtZero: true,
                              fontFamily: "Nunito Sans",
                            },
                          },
                        ],
                        xAxes: [
                          {
                            gridLines: { display: true },
                            ticks: { fontFamily: "Nunito Sans" },
                          },
                        ],
                      },
                    }}
                    // options={chartExample1.options}
                    // getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Promoter Analysis</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Promoter name</th>
                    <th scope="col">Events</th>
                    <th scope="col">Orders</th>
                    <th scope="col">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Suresh</th>
                    <td>46</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Mahesh</th>
                    <td>25</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" /> 40%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Companies</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Company Name</th>
                    <th scope="col">Events</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Dunzo</th>
                    <td>300</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Zepto</th>
                    <td>250</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    count: state.count,
    bpoGraph: state.bpoGraph,
    GBQGraph: state.GBQGraph,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    countGetData: (data) => dispatch(actions.countGetData(data)),
    bpoGraphGetData: (data) => dispatch(actions.bpoGraphGetData(data)),
    GBQGraphGetData: (data) => dispatch(actions.GBQGraphGetData(data)),
    GSQGraphGetData: (data) => dispatch(actions.GSQGraphGetData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
