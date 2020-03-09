import { Component } from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { restoreAuthentication } from "../redux/actions/userActions";

type TAuthenticationComponentProps = ReturnType<typeof mapDispatchToProps>;

class AuthenticationComponent extends Component<TAuthenticationComponentProps> {
  constructor(props: TAuthenticationComponentProps) {
    super(props);
    this.props.restoreAuthentication();
  }

  public render() {
    return this.props.children;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      restoreAuthentication
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AuthenticationComponent);
