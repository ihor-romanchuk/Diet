import { Component } from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AppState } from "../redux/reducers/rootReducer";
import { setIsAuthenticated } from "../redux/actions/userActions";

class AuthenticationComponent extends Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
  {}
> {
  public componentDidMount() {
    this.props.setIsAuthenticated();
  }

  public render() {
    return this.props.children;
  }
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.userReducer.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setIsAuthenticated
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationComponent);
