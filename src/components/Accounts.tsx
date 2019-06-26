import * as React from "react";
import Column from "./Column";
import styled from "styled-components";
import Icon from "./Icon";

const AccountRow = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;
const AccountLeft = styled.div`
  display: flex;
`;
const AccountIcon = styled.div`
  display: flex;
`;
const AccountName = styled.div`
  display: flex;
  margin-left: 10px
`;
const AccountAddress = styled.div`
  display: flex;
`;

const Accounts = (props: any) => {
    const { accounts } = props;

    const symbols = {
        60: 'eth',
        118: 'atom',
        714: 'bnb',
    };
    const names = {
        60: 'Ethereum',
        118: 'Cosmos',
        714: 'Binance',
    };

    const fullAccounts = accounts.map((account: { network: number; address: string }) => ({
        ...account,
        name: names[account.network],
        symbol: symbols[account.network]
    }));

    return (
        <Column center>
        { fullAccounts.map((account: { network:  number; name: string; symbol: string; address: string; }) =>
            <AccountRow key={account.network}>
                <AccountLeft>
                    <AccountIcon>
                        <Icon src={require(`../assets/${account.symbol}.svg`)}/>
                    </AccountIcon>
                    <AccountName>{account.name}</AccountName>
                </AccountLeft>
                <AccountAddress>{account.address}</AccountAddress>
            </AccountRow>
        ) }
        </Column>
    );
};

export default Accounts;
