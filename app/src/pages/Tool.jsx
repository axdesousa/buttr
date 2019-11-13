import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from "react-router-dom"
import { Creators } from "../store/ducks/tool"

import { IoIosAdd, IoIosLogOut } from "react-icons/io"

import CardItem from "../components/cardItem"
import ManageTool from "../components/manageTool"
import Loading from "../components/loading"
import Notification from "../components/notification"
import ConfirmeDelete from "../components/confirmeDelete"

import { Creators as AuthCreators } from "../store/ducks/auth"
class Tool extends Component {
    state = {
        modalTool: false,
        inTag: false,
        tool: null,
        modalDeleteTool: false,
        test: ""
    }

    componentDidMount() {
        this.props.fetch()
    }

    edit(tool) {
        this.setState({ tool, modalTool: true })
    }

    destroyTool(tool) {
        this.setState({ tool, modalDeleteTool: true })
    }

    render() {
        return (
            <div className="app-wrapper-content">
                <Notification message={this.props.app.message} dispatch={this.props.dispatch} />
                <Loading show={this.props.app.loading} />
                <ConfirmeDelete
                    show={this.state.modalDeleteTool}
                    tool={this.state.tool}
                    destroy={() => {
                        this.setState({ tool: null, modalDeleteTool: false })
                        this.props.destroy(this.state.tool.id)
                    }}
                    close={() => this.setState({ tool: null, modalDeleteTool: false })}
                />
                <ManageTool
                    state={this.state}
                    save={this.props.save}
                    close={() => this.setState({ modalTool: false, tool: null })}
                />
                <div className="tool-header">
                    <div className="tool-header-title">
                        <h1>VUTTR</h1>
                        <p>Very Useful Tools to Remember</p>
                    </div>
                    <div className="tool-header-logout">
                        <IoIosLogOut size={40} onClick={() => this.props.logout()} />
                    </div>
                </div>
                <div className="form-search">
                    <div className="field" style={{ width: 200, float: "left" }}>
                        <div className="control">
                            <input
                                value={this.props.tool.search}
                                className="input"
                                type="text"
                                placeholder="Search"
                                onChange={e => this.props.search(e.target.value, this.state.inTag)}
                            />
                        </div>
                    </div>
                    <div
                        className="field"
                        style={{ width: 200, marginTop: 8, marginLeft: 10, float: "left" }}
                    >
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    onChange={() => this.setState({ inTag: !this.state.inTag })}
                                />
                                search tags in only
                            </label>
                        </div>
                    </div>
                    <div className="field is-grouped" style={{ float: "right" }}>
                        <div className="control">
                            <button
                                onClick={() => this.setState({ modalTool: true })}
                                className="button is-link is-light"
                            >
                                <IoIosAdd /> Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="app-content">
                    {this.props.tool.data.map(tool => (
                        <CardItem
                            apaga={() => {
                                console.log("vai")
                                this.destroyTool(tool)
                            }}
                            edit={() => this.edit(tool)}
                            key={`key_${tool.id}`}
                            {...tool}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    app: state.app,
    tool: state.tool
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(Creators, dispatch),
        ...bindActionCreators(AuthCreators, dispatch)
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Tool)
)
