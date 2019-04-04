import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import WalletConnectLogo from "./assets/walletconnect.svg";
import Button from "./Button";

interface IWeb3ConnectStyleProps {
  show: boolean;
}

const SLightbox = styled.div<IWeb3ConnectStyleProps>`
  transition: opacity 0.1s ease-in-out;
  text-align: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin-left: -50vw;
  top: 0;
  left: 50%;
  z-index: 2;
  will-change: opacity;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SModalContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SHitbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SModalCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  padding: 25px;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IWeb3ConnectProps {
  onClose: any;
  onConnect: any;
}

interface IWeb3ConnectState {
  show: boolean;
}

const INITIAL_STATE: IWeb3ConnectState = {
  show: false
};

class Web3Connect extends React.Component<
  IWeb3ConnectProps,
  IWeb3ConnectState
> {
  public propTypes = {
    onClose: PropTypes.func.isRequired
  };
  public state: IWeb3ConnectState = {
    ...INITIAL_STATE
  };

  public toggleModal = async () => {
    await this.setState({ show: !this.state.show });
  };

  public onConnect = () => this.props.onConnect(null);

  public onClose = async () => {
    await this.toggleModal();
    this.props.onClose();
  };

  public onClickOutside = () => {
    console.log("[Web3Connect] onClickOutside"); // tslint:disable-line
    this.onClose();
  };

  public render = () => {
    const { show } = this.state;
    return (
      <React.Fragment>
        <Button icon={WalletConnectLogo} onClick={this.toggleModal}>
          {"WalletConnect"}
        </Button>

        <SLightbox show={show}>
          <SModalContainer>
            <SHitbox onClick={this.onClose} />
            <SModalCard>
              <div>{`Metamask`}</div>
              <div>{`WalletConnect`}</div>
            </SModalCard>
          </SModalContainer>
        </SLightbox>
      </React.Fragment>
    );
  };
}

export default Web3Connect;
