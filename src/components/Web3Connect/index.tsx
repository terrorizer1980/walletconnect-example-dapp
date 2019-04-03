import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import Web3ConnectButton from "./Web3ConnectButton";

const SWeb3ConnectButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 250px;
  margin: 50px 0;
`;

const SWeb3ConnectButton = styled(Web3ConnectButton)`
  border-radius: 8px;
  font-size: 16px;
  height: 44px;
  width: 100%;
  margin: 12px 0;
`;

interface IWeb3ConnectStyleProps {
  show: boolean;
}

const SWeb3ConnectLightbox = styled.div<IWeb3ConnectStyleProps>`
  transition: all 0.1s ease-in-out;
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

const SWeb3ConnectModalContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SWeb3ConnectHitbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SWeb3ConnectModal = styled.div`
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
  show: true
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
        <SWeb3ConnectButtonContainer>
          <SWeb3ConnectButton onClick={this.toggleModal}>
            {"Web3Connect"}
          </SWeb3ConnectButton>
        </SWeb3ConnectButtonContainer>
        <SWeb3ConnectLightbox show={show}>
          <SWeb3ConnectModalContainer>
            <SWeb3ConnectHitbox onClick={this.onClose} />
            <SWeb3ConnectModal>
              <div>{`Modal`}</div>
            </SWeb3ConnectModal>
          </SWeb3ConnectModalContainer>
        </SWeb3ConnectLightbox>
      </React.Fragment>
    );
  };
}

export default Web3Connect;
