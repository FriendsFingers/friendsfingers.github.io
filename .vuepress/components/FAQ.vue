<template>
    <b-container>
        <b-row class="masthead m-4">
            <b-col lg="12">
                <h1 class="display-5">
                    <b-img :src="$withBase('/assets/images/logo/friendsfingers.svg')"
                           rounded="circle"
                           height="64"
                           :alt="$site.title"/>
                    <br>
                    FriendsFingers FAQ
                </h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="12">
                <div role="tablist">
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-link href="#" v-b-toggle.accordion-ico>
                                What is an ICO?
                            </b-link>
                        </b-card-header>
                        <b-collapse id="accordion-ico" visible accordion="faq-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>
                                    <p>
                                        ICO is the abbreviation of Initial Coin Offering. It means that someone offers
                                        investors some units of a new cryptocurrency or crypto-token in exchange against
                                        cryptocurrencies like Bitcoin or Ethereum. Since 2013 ICOs are often used to
                                        fund the development of new cryptocurrencies. The pre-created token can be
                                        easily sold and traded on all cryptocurrency exchanges if there is demand for
                                        them.<br>
                                        With the success of Ethereum ICO are more and more used to fund the development
                                        of a crypto project by releasing token which is somehow integrated into the
                                        project. With this turn, ICO has become a tool that could revolutionize not just
                                        currency but the whole financial system. ICO token could become the securities
                                        and shares of tomorrow.
                                    </p>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-link href="#" v-b-toggle.accordion-ethereum>
                                What is Ethereum?
                            </b-link>
                        </b-card-header>
                        <b-collapse id="accordion-ethereum" visible accordion="faq-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>
                                    <p>
                                        Ethereum is a decentralized platform that runs smart contracts: applications
                                        that run exactly as programmed without any possibility of downtime, censorship,
                                        fraud or third-party interference.<br>
                                        These apps run on a custom built blockchain, an enormously powerful shared
                                        global infrastructure that can move value around and represent the ownership of
                                        property.<br>
                                        This enables developers to create markets, store registries of debts or
                                        promises, move funds in accordance with instructions given long in the past
                                        (like a will or a futures contract) and many other things that have not been
                                        invented yet, all without a middleman or counterparty risk.<br><br>
                                        Ethereum official website
                                        <b-link href="https://www.ethereum.org" target="_blank">
                                            https://www.ethereum.org <font-awesome-icon icon="external-link-alt" />
                                        </b-link>
                                    </p>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-link href="#" v-b-toggle.accordion-explorer>
                                How to explore the Ethereum blockchain?
                            </b-link>
                        </b-card-header>
                        <b-collapse id="accordion-explorer" visible accordion="faq-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>
                                    <p>
                                        A Block Explorer is basically a search engine that allows users to easily
                                        lookup, confirm and validate transactions that have taken place on the Ethereum
                                        Blockchain.<br><br>
                                        Etherscan
                                        <b-link href="https://etherscan.io" target="_blank">
                                            https://etherscan.io <font-awesome-icon icon="external-link-alt" />
                                        </b-link>
                                    </p>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-link href="#" v-b-toggle.accordion-dao>
                                What is a DAO?
                            </b-link>
                        </b-card-header>
                        <b-collapse id="accordion-dao" visible accordion="faq-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>
                                    <p>
                                        A DAO (Decentralized Autonomous Organization) can be seen as the most complex
                                        form of a smart contract, where the bylaws of the decentralized organization are
                                        embedded into the code of the smart contract, using complex token governance
                                        rules.<br>
                                        <b>How DAOs work</b><br>
                                        Decentralized Autonomous Organisations (DAOs) run through rules encoded as
                                        computer programs called smart contracts. It is an entity that lives on the
                                        internet and exists autonomously, but also heavily relies on hiring individuals
                                        to perform certain tasks that the automaton itself cannot do.<br>
                                    </p>
                                    <ul>
                                        <li>
                                            Tokens of Transaction: In order to exist a DAO needs some kind of internal
                                            property that is valuable in some way, and it has the ability to use that
                                            property as a mechanism for rewarding certain activities. The funding takes
                                            place directly upon creation of the organization. DAOs do not have a
                                            hierarchical structure, nor executives or management.
                                        </li>
                                        <li>
                                            Autonomous: Once deployed the entity is independent of its creators and
                                            cannot be influenced by outside forces. DAOs are open source, thus
                                            transparent and incorruptible. A DAO’s financial transaction record and
                                            program rules are maintained on a blockchain. This approach eliminates the
                                            need to involve a bilaterally accepted trusted third party in a financial
                                            transaction.
                                        </li>
                                        <li>
                                            Consensus: In order to withdraw or move funds from a DAO, a majority of its
                                            stakeholders (this percentage could be specified in the code of the DAO)
                                            must agree on the decision. Even if bugs are found in the code, they could
                                            not be corrected until a voting procedure has taken place and the majority
                                            of voters agreed on it, which could leave known security holes open to
                                            exploitation.
                                        </li>
                                        <li>
                                            Contractors: A DAO cannot build a product, write code or develop hardware.
                                            It needs a contractor to accomplish its goals. Contractors get appointed via
                                            voting of token holders.
                                        </li>
                                        <li>
                                            Proposals: Proposals are the primary way for making decisions in a DAO. To
                                            avoid people overloading the network with proposals, a DAO could require a
                                            monetary deposit to prevent people from spamming the network.
                                        </li>
                                        <li>
                                            Voting: After submitting a proposal, voting takes place. DAOs allow people
                                            to exchange economic value with anyone in the world, like investing, money
                                            raising, lending, borrowing, without the need of an intermediary, just by
                                            trusting the code.
                                        </li>
                                    </ul>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-link href="#" v-b-toggle.accordion-dapp>
                                What is a DApp?
                            </b-link>
                        </b-card-header>
                        <b-collapse id="accordion-dapp" visible accordion="faq-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>
                                    <p>
                                        DApp is an abbreviated form for decentralized application.<br>
                                        A DApp has its backend code running on a decentralized peer-to-peer network.
                                        Contrast this with an app where the backend code is running on centralized
                                        servers.<br>
                                        A DApp can have frontend code and user interfaces written in any language (just
                                        like an app) that can make calls to its backend. Furthermore, its frontend can
                                        be hosted on decentralized storage such as Swarm or IPFS.<br>
                                        For an application to be considered a Dapp (pronounced Dee-app, similar to
                                        Email) it must meet the following criteria:<br>
                                    </p>
                                    <ul>
                                        <li>
                                            The application must be completely open-source, it must operate
                                            autonomously, and with no entity controlling the majority of its tokens. The
                                            application may adapt its protocol in response to proposed improvements and
                                            market feedback but all changes must be decided by consensus of its users.
                                        </li>
                                        <li>
                                            The application's data and records of operation must be cryptographically
                                            stored in a public, decentralized blockchain in order to avoid any central
                                            points of failure.
                                        </li>
                                        <li>
                                            The application must use a cryptographic token (bitcoin or a token native to
                                            its system) which is necessary for access to the application and any
                                            contribution of value from (miners / farmers) should be rewarded in the
                                            application’s tokens.
                                        </li>
                                        <li>
                                            The application must generate tokens according to a standard crytptographic
                                            algorithm acting as a proof of the value nodes are contributing to the
                                            application (Bitcoin uses the Proof of Work Algorithm).
                                        </li>
                                    </ul>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-link href="#" v-b-toggle.accordion-erc20>
                                What is an ERC20 token?
                            </b-link>
                        </b-card-header>
                        <b-collapse id="accordion-erc20" visible accordion="faq-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>
                                    <p>
                                        The Ethereum token standard (ERC20) defines a common list of rules that an
                                        Ethereum token has to implement. Giving developers the ability to program how
                                        new tokens will function within the Ethereum ecosystem. This token protocol
                                        became popular with crowdfunding companies via initial coin offering
                                        (ICO).<br><br>
                                        Technical specification
                                        <b-link href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md"
                                                target="_blank">
                                            https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
                                            <font-awesome-icon icon="external-link-alt" />
                                        </b-link>
                                    </p>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-link href="#" v-b-toggle.accordion-gas>
                                What is Gas?
                            </b-link>
                        </b-card-header>
                        <b-collapse id="accordion-gas" visible accordion="faq-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>
                                    <p>
                                        "Gas" is the name for a special unit used in Ethereum. It measures how much
                                        "work" an action or set of actions takes to perform.<br>
                                        Every operation that can be performed by a transaction or contract on the
                                        Ethereum platform costs a certain number of gas, with operations that require
                                        more computational resources costing more gas than operations that require few
                                        computational resources.<br>
                                        The reason gas is important is that it helps to ensure an appropriate fee is
                                        being paid by transactions submitted to the network. By requiring that a
                                        transaction pay for each operation it performs (or causes a contract to
                                        perform), we ensure that network doesn't become bogged down with performing a
                                        lot of intensive work that isn't valuable to anyone.<br><br>
                                        Good explanation of Gas
                                        <b-link href="https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas"
                                                target="_blank">
                                            https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas
                                            <font-awesome-icon icon="external-link-alt" />
                                        </b-link>
                                        <br>
                                        How to estimate Gas price
                                        <b-link href="https://ethgasstation.info/" target="_blank">
                                            https://ethgasstation.info <font-awesome-icon icon="external-link-alt" />
                                        </b-link>
                                    </p>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-link href="#" v-b-toggle.accordion-wallet>
                                What are Ethereum and ERC20 compatible Wallet?
                            </b-link>
                        </b-card-header>
                        <b-collapse id="accordion-wallet" visible accordion="faq-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>
                                    <ul>
                                        <li>
                                            <b-link href="https://metamask.io/" target="_blank">
                                                MetaMask <font-awesome-icon icon="external-link-alt" />
                                            </b-link>
                                            (recommended to use DApps)
                                        </li>
                                        <li>
                                            <b-link href="https://www.myetherwallet.com/" target="_blank">
                                                MyEtherWallet <font-awesome-icon icon="external-link-alt" />
                                            </b-link>
                                        </li>
                                        <li>
                                            <b-link href="https://mycrypto.com/" target="_blank">
                                                MyCrypro <font-awesome-icon icon="external-link-alt" />
                                            </b-link>
                                        </li>
                                        <li>
                                            <b-link href="https://trezor.io" target="_blank">
                                                TREZOR <font-awesome-icon icon="external-link-alt" />
                                            </b-link>
                                        </li>
                                        <li>
                                            <b-link href="https://www.ledgerwallet.com" target="_blank">
                                                Ledger Wallet <font-awesome-icon icon="external-link-alt" />
                                            </b-link>
                                        </li>
                                        <li>
                                            <b-link href="https://eidoo.io/" target="_blank">
                                                Eidoo (Mobile) <font-awesome-icon icon="external-link-alt" />
                                            </b-link>
                                        </li>
                                    </ul>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-link href="#" v-b-toggle.accordion-exchange>
                                Where to buy Ether?
                            </b-link>
                        </b-card-header>
                        <b-collapse id="accordion-exchange" visible accordion="faq-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text>
                                    <ul>
                                        <li>
                                            <b-link href="https://www.coinbase.com" target="_blank">
                                                Coinbase <font-awesome-icon icon="external-link-alt" />
                                            </b-link>
                                        </li>
                                        <li>
                                            <b-link href="https://www.binance.com/" target="_blank">
                                                Binance <font-awesome-icon icon="external-link-alt" />
                                            </b-link>
                                        </li>
                                        <li>
                                            <b-link href="https://www.bitfinex.com/" target="_blank">
                                                Bitfinex <font-awesome-icon icon="external-link-alt" />
                                            </b-link>
                                        </li>
                                    </ul>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    name: 'FAQ',
  };
</script>
