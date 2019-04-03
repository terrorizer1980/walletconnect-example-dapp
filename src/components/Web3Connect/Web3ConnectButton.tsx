import * as React from "react";
import styled from "styled-components";

interface IButtonStyleProps {
  disabled: boolean;
}

interface IButtonProps extends IButtonStyleProps {
  children: React.ReactNode;
  onClick?: any;
}

const SHoverLayer = styled.div`
  transition: all 0.15s ease-in-out;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgb(255, 255, 255, 0.1);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
`;

const SButton = styled.button<IButtonStyleProps>`
  transition: all 0.15s ease-in-out;
  position: relative;
  border: none;
  border-style: none;
  box-sizing: border-box;
  background-color: rgb(64, 153, 255);
  border: none;
  color: rgb(255, 255, 255);
  box-shadow: 0 4px 6px 0 rgba(50, 50, 93, 0.11),
    0 1px 3px 0 rgba(0, 0, 0, 0.08), inset 0 0 1px 0 rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 12px;
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  will-change: transform;

  &:disabled {
    opacity: 0.6;
    box-shadow: 0 4px 6px 0 rgba(50, 50, 93, 0.11),
      0 1px 3px 0 rgba(0, 0, 0, 0.08), inset 0 0 1px 0 rgba(0, 0, 0, 0.06);
  }

  @media (hover: hover) {
    &:hover {
      transform: ${({ disabled }) => (!disabled ? "translateY(-1px)" : "none")};
      box-shadow: ${({ disabled }) =>
        !disabled
          ? `0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.08), inset 0 0 1px 0 rgba(0, 0, 0, 0.06)`
          : `0 4px 6px 0 rgba(50, 50, 93, 0.11), 0 1px 3px 0 rgba(0, 0, 0, 0.08), inset 0 0 1px 0 rgba(0, 0, 0, 0.06)`};
    }

    &:hover ${SHoverLayer} {
      opacity: 1;
      visibility: visible;
    }
  }

  &:active {
    transform: ${({ disabled }) => (!disabled ? "translateY(1px)" : "none")};
    box-shadow: 0 4px 6px 0 rgba(50, 50, 93, 0.11),
      0 1px 3px 0 rgba(0, 0, 0, 0.08), inset 0 0 1px 0 rgba(0, 0, 0, 0.06);
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Button = (props: IButtonProps) => (
  <SButton type="button" disabled={props.disabled} {...props}>
    <SHoverLayer />
    {props.children}
  </SButton>
);

Button.defaultProps = {
  disabled: false
};

export default Button;
