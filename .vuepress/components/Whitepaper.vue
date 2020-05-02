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
                    FriendsFingers Whitepaper
                </h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="12">

                <b-alert show variant="primary" class="mb-3">
                    <h4 class="alert-heading">Legal Disclaimer</h4>
                    <p>
                        This Whitepaper does not constitute a prospectus or offer document of any sort, and is not
                        intended to constitute an offer of securities or a solicitation for investments in securities in
                        any jurisdiction. The contents of this Whitepaper are not a financial promotion. Therefore, none
                        of the contents of this Whitepaper serves as an invitation or inducement to engage in any sort
                        of investment activity. This whitepaper constitutes a technical description of the functionality
                        of the FriendsFingers Smart Contracts and the creation and issuance of Shaka Tokens.
                        No regulatory authority has examined or approved any of the information set out in this
                        Whitepaper. The publication, distribution or dissemination of this Whitepaper does not imply
                        that the applicable laws, regulatory requirements, or rules have been complied.
                        Contributors are advised to read this document carefully in full, and perform due diligence.
                    </p>
                </b-alert>

                <b-card title="Abstract" class="mb-3">
                    <b-card-text>
                        <p>
                            <b>FriendsFingers</b> is an open-source Decentralized Application (DApp) built on Smart
                            Contracts running on Ethereum Blockchain.<br>
                            FriendsFingers will help startups and small businesses to start a trustworthy Crowdsale
                            based on Ethereum with <u>no setup costs and zero lines of code required</u>.
                        </p>
                        <p>
                            Furthermore, <b>Shaka (HAK)</b>, an ERC20 Token issued by FriendsFingers, will give holders
                            rights to be active part on platform key decisions like in a Decentralized Autonomous
                            Organization (DAO).
                        </p>
                        <hr>
                        <p>
                            A lot of people may have already ideas that they want to develop but they need help and some
                            funds to bring them to life.<br>
                            But who would lend money to someone they don’t trust?<br>
                            A solution may be starting a classical crowdfunding or an IPO, but they require a lot of
                            paperwork to fill out and many other complications to be covered.<br>
                            Blockchain will solve many of these problems allowing everyone to build their crypto-based
                            crowdsale.<br>
                            The public ledger is the strength everyone can use to ensure investors not to be fraud.
                        </p>
                        <hr>
                        <p>
                            Using FriendsFingers, people can easily deploy a Smart Contract that will hold contributor's
                            money until any given date or goal is reached. Depending on the outcome, the funds will
                            either be released to the project owners or safely returned back to the contributors.<br>
                            All of this is possible without requiring a centralized arbitrator, clearing house or having
                            to trust anyone.<br>
                            People can even use the token they create to keep track of the distribution of rewards.
                        </p>
                        <hr>
                        <h5>Have a great project?</h5>
                        <p>Discover how to bring it to life with FriendsFingers.</p>
                    </b-card-text>
                </b-card>
                <b-card title="What is Ethereum" class="mb-3">
                    <b-card-text>
                        <p>
                            Ethereum is a decentralized platform that runs smart contracts: applications that run
                            exactly as programmed without any possibility of downtime, censorship, fraud or third party
                            interference.
                        </p>
                        <p>
                            These apps run on a custom built blockchain, an enormously powerful shared global
                            infrastructure that can move value around and represent the ownership of property.<br>
                            This enables developers to create markets, store registries of debts or promises, move funds
                            in accordance with instructions given long in the past (like a will or a futures contract)
                            and many other things that have not been invented yet, all without a middle man or
                            counterparty risk.
                        </p>
                        <p>
                            On traditional server architectures, every application has to set up its own servers that
                            run their own code in isolated silos, making sharing of data hard. If a single app is
                            compromised or goes offline, many users and other apps are affected.
                        </p>
                        <p>
                            On a blockchain, anyone can set up a node that replicates the necessary data for all nodes
                            to reach an agreement and be compensated by users and app developers. This allows user data
                            to remain private and apps to be decentralized like the Internet was supposed to work.
                        </p>
                    </b-card-text>
                </b-card>
                <b-card title="Problem" class="mb-3">
                    <b-card-text>
                        <p>
                            ICOs can be compared to IPOs and crowdfunding. However, while IPOs deal with investors, ICOs
                            deal with supporters that are keen to invest in a new project much like a crowdfunding
                            event. But ICOs are different from crowdfunding in that the supporters of the former are
                            motivated by a prospective return in their investments, while the funds raised in the latter
                            campaign are basically donations. For these reasons, ICOs are referred to as crowdsales.<br>
                            Although there are successful ICO transactions on record and ICOs are emerging successfully
                            within the digital era, investors are cautioned to be wary as some ICO or crowdsale
                            campaigns are actually fraudulent. Because these fund-raising operatives are not regulated
                            by financial authorities such as the Securities Exchange Commission (SEC), funds that are
                            lost due to fraudulent initiatives may never be recovered.
                        </p>
                        <p>
                            Crowdfunding is the use of small amounts of capital from a large number of individuals to
                            finance a new business venture.<br>
                            Crowdfunding has created the opportunity for entrepreneurs to raise hundreds of thousands or
                            millions of dollars from anyone with money to invest. Crowdfunding websites such as
                            Kickstarter and Indiegogo attract thousands of people hoping to invest in the next big
                            thing. Many crowdfunding projects are rewards-based; investors may get to participate in the
                            launch of a new product or receive a gift for their investment.
                        </p>
                        <p>
                            There are many limitations beyond every new IPO. First, traditional crowdfunding platforms
                            do not accept projects from countries where they have no presence. Second, they charge high
                            commissions (15-20%), as do the payment systems people must use to contribute with. Third,
                            they are overwhelmed with "failed" projects that let down the backers and the platform
                            itself. Fourth, the larger crowdfunding platforms became all about big companies with strong
                            marketing, rather than about creators with bright ideas, but no marketing budget.<br>
                            Launching a crowdfunding campaign or an IPO requires a resident to be present in one of the
                            countries of official work, and there is also a lot of paperwork to fill out. As a result,
                            many creators have no access to large crowdfunding platforms, limiting their fundraising
                            opportunities, and narrowing the reach and diversity of the platforms.
                        </p>
                        <p>
                            The recent diffusion of cryptocurrencies may change this situation, making fundraising easy
                            and potentially accessible everyone. Decentralization, crypto-currency, and smart contracts
                            are the new solutions for a project to raise funds. Obviously according any applicable laws,
                            regulatory requirements, or rules in your residence country.
                        </p>
                        <p>
                            So Smart Contracts can solve all of these problems but, to deploy a Smart Contract, it
                            requires a lot of technical competencies or to pay (lot of Bitcoins) in advance to a company
                            to do it for you.
                        </p>
                    </b-card-text>
                </b-card>
                <b-card title="Solution" class="mb-3">
                    <b-card-text>
                        <h5>Fund a project with a trustworthy crowdsale.</h5>
                        <p>
                            Many people or startups already have ideas that they want to develop on Ethereum or simply
                            they need to raise funds for their projects. Who would send money to someone they don’t
                            trust?
                        </p>
                        <p>
                            Sometimes a good idea takes a lot of funds and collective effort. You could ask for
                            donations, but donors prefer to give to projects they are more certain will get traction and
                            proper funding.
                        </p>
                        <p>
                            FriendsFingers helps you to start a crowdfunding that would be ideal for investors: you set
                            up a goal and a deadline for reaching it. If you miss your goal, the donations are returned,
                            reducing the risk for donors. Since the code is open and auditable, there is no need for a
                            centralized, trusted platform. Therefore, the only fees paid will be the Gas fees.<br>
                            <u>You don't need to have any technical skill or to pay nothing in advance</u>.
                        </p>
                        <p>
                            By using Ethereum, you can create a contract that will hold a contributor's money until any
                            given date or goal is reached. Depending on the outcome, the funds will either be released
                            to the project owners or safely returned back to the contributors. That is all possible
                            without requiring a centralized arbitrator, clearing house or having to trust anyone.<br>You
                            can even use the token you created earlier to keep track of the distribution of rewards.
                        </p>
                        <p>
                            Rewards in crowdfundings are usually handled by a central unchangeable database that keeps
                            track of all donors: anyone who missed the deadline for the campaign cannot get in anymore.
                            Instead we are going to do this the decentralized way and just create a token to keep track
                            of rewards, anyone who contributes gets a token that they can trade, sell or keep for later.
                            <br>Donors get to keep their tokens, even if the project doesn't achieve its goals,
                            as a souvenir.
                        </p>
                    </b-card-text>
                </b-card>
                <b-card title="How FriendsFingers works" class="mb-3">
                    <b-card-text>
                        <p>
                            The crowdsales started on FriendsFingers and the corresponding tokens creation processes
                            will be organized around Smart Contracts running on Ethereum Network. All the source code
                            of both Smart Contracts and platform will be verified on Etherscan and published on GitHub,
                            where you can read and analyze any line of the code you will use. Our platform itself will
                            be a DApp (Decentralized Application) hosted on GitHub pages. We have no servers and no
                            databases, we don’t store any datas in places you can’t see them. All will be public on the
                            Blockchain and open-sourced on GitHub to have a strong and trustworthy crowdsale.
                        </p>
                        <p>
                            Furthermore, Shaka (HAK), our token, will give holders rights to be active part on platform
                            key decisions like in a Decentralized Autonomous Organization (DAO).
                        </p>
                        <p>
                            If you trust us, your investors will trust you the same way. We want to give you the better
                            solution to make your crowdfund trustworthy and disruptive.
                        </p>
                        <h4>Starting Crowdsale</h4>
                        <p>
                            Users that want to start a crowdsale on FriendsFingers must only fill a form with all
                            informations needed to start it like the project name, the crowdsale goal and target, the
                            crowdsale deadlines, the name of the token to issue, the tokens rate per ETH, the Ethereum
                            wallet address where funds will be collected and some others informations regarding
                            crowdsale official links and Whitepaper.<br>
                            They can also choose an amount of tokens to be issued for crowdsale creators at the
                            beginning of the crowdsale.<br>
                            <u>After the crowdsale end no more tokens can be issued.</u>
                        </p>
                        <p>
                            The unique requirement users must have to start their crowdsale is an Ethereum wallet
                            address with a small ETH balance to pay the Gas fee
                            <small>
                                (Note that Gas fee, as explained in our FAQ section, is not for FriendsFingers
                                but it serves only to pay miners that will include your transaction in the blockchain)
                            </small>.
                        </p>
                        <p>
                            After the creation process creators will receive a public link for their crowdsale so they
                            can share it on their promotion channels.
                        </p>
                        <p>
                            In order to avoid any fraudulent attempt, our team reserves the right to review both already
                            started crowdsales content and crowdsales team members, eventually stopping the crowdsale.
                            The right to approve or disapprove crowdsales which show an unclear project or team will be
                            also exercised by our token holders within the near future. Stopped campaigns might be
                            restarted if team members of those will present a reasonable documentation supporting the
                            genuinity of their project, which will be always evaluated by our team and our tokens
                            holders.
                        </p>
                        <b-alert show variant="primary">
                            FriendsFingers does <u>never</u> ask to send money or crypto or to share password or
                            keystore of any digital assets.
                        </b-alert>
                        <h4>Entering the Crowdsale</h4>
                        <p>
                            To enter the crowdsale, investors should go in previous generated page where they will find
                            any informations regarding the project as inserted before.
                        </p>
                        <p>
                            Participants willing to support crowdsale can do so by sending Ether currency through
                            FriendsFingers platform or by sending Ether to the designated address using their preferred
                            Ethereum wallet. By doing so, they will receive crowdsale's token at the rate creator has
                            chosen before which are sent instantly to their wallet.
                        </p>
                        <p>
                            Token will be transferable only when the crowdsale is over to avoid to see them on secondary
                            market before than crowdsale end.
                        </p>
                        <p>
                            Everyone can even verify his transaction and see the received tokens exploring the
                            blockchain (for instance using Etherscan) or through FriendsFingers platform itself.
                        </p>
                        <h4>Closing the Crowdsale</h4>
                        <p>
                            At the end of the crowdsale, creators can choose to restart another round with lower rate
                            per ETH for a max of 5 times, or they can decide to close the crowdsale.
                        </p>
                        <p>
                            The later rounds will have a goal of 0 (zero) ETH because of we suppose that they reached
                            their goal in the first round and they are only issuing other tokens at a lower rate (they
                            can't set a rate greater than previous rounds as written in the Smart Contract).
                        </p>
                        <p>
                            When creators close the crowdsale the token ownership will be transferred to them, so they
                            will have any rights to make actions on it.
                        </p>
                        <p>
                            When each round of the crowdsale ends, if it reaches the goal, funds will be immediately
                            transferred to the creator designed wallet except a little fee of the raised amount which
                            will go to FriendsFingers wallet. FriendsFingers will also take a percent of each round max
                            token supply to help creators with token distribution. Starting fee is 5% and it should be
                            only decreased in time according to the Smart Contract. Creators can also receive discount
                            on fees as expressed below in Shaka Token description.
                        </p>
                        <p>
                            If crowdsale doesn’t reach the goal, investors can easily claim their funds back and
                            creators don’t have to pay any fee to FriendsFingers. Creators can't be able to restart a
                            crowdsale if it ended under the goal.
                        </p>
                        <p>
                            According to the Smart Contract, if some investors don’t claim their refunds a year after
                            the crowdsale end, these can be transferred to FriendsFingers wallet and used for platform
                            development or for any other purpose decided by a public vote as expressed below in Token
                            description.
                        </p>
                        <h4>Some details about the tokens</h4>
                        <p>
                            Technically the token creators are issuing is a "mintable", "burnable" ERC20 token and at
                            the end of the crowdsale the finish minting function will be called by the Smart Contract by
                            blocking the total circulating supply. It means that tokens can be created only during the
                            crowdsale and nobody can create an additional amount of tokens after the crowdsale end. This
                            increases the confidence of investors ensuring them that creators can't be malicious or
                            undervalue token price by generating more tokens than they have declared before.
                        </p>
                        <b-alert show variant="warning">
                            <small>Note: FriendsFingers does not provide any legal or marketing support for your
                                crowdsale (at this time) excluding what expressed in this Whitepaper, so you will be
                                responsible for a successful and legal campaign by sharing your project using your own
                                channels. FriendsFingers only provide you the way to start an Ethereum based crowdsale
                                without having any coding requirement and without any setup cost.</small>
                        </b-alert>
                    </b-card-text>
                </b-card>
                <b-card title="ICO List" class="mb-3">
                    <b-card-text>
                        <p>
                            We also provide ICO list service and the ability to use our DApp to interact with
                            third-party Contracts.
                        </p>
                        <p>
                            In these cases you won't find the
                            <b-badge variant="primary" class="p-2">FF Deployed</b-badge>
                            badge but the
                            <b-badge variant="info" class="p-2">3rd Party Deployed</b-badge>
                            instead.
                        </p>
                        <p>
                            It means that these contracts could not work as ours and we cannot guarantee that all will
                            work as described in our Whitepaper. You are enforced to read thier Whitepaper, documents
                            and any type of informations before invest in any type of project.
                        </p>
                        <p>
                            Anycase, we do not accept contract with no public and verified code on Etherscan and this is
                            labelled by the
                            <b-badge variant="success" class="p-2">Verified Contract</b-badge>
                            badge. You can check 3rd Party contracts' code on Etherscan.
                        </p>
                        <p>
                            Remember that FriendsFingers does not offer solicitations for investments in any
                            jurisdiction. Contributors are advised to read this document carefully in full, and perform
                            due diligence.
                        </p>
                    </b-card-text>
                </b-card>
                <b-card title="Shaka Token" class="mb-3">
                    <b-card-text>
                        <p>Details:</p>
                        <ul>
                            <li><b>Name:</b> Shaka</li>
                            <li><b>Symbol:</b> HAK</li>
                            <li><b>Type:</b> ERC20</li>
                            <li><b>Maximum Supply:</b> 200,000,000 HAK</li>
                            <li><b>Initial Supply:</b> 140,000,000 HAK</li>
                        </ul>
                        <p>Each token offers the following rights to its holder:</p>
                        <ul>
                            <li>
                                Right to vote on platform key decisions.<br>
                                Each token grants its holder one vote which may be used at token holder’s discretion
                                participating in platform proposal. The more tokens one has the more votes one can cast
                                with a max of 100 votes per user. Only whole HAK tokens grant votes - if a token holder
                                owns a fraction of HAK token, such fractional HAK token does not grant any voting
                                rights.<br>
                                Proposals on platform may interest for instance:
                                <ul>
                                    <li>propose or decide to block a fraudulent Crowdsale</li>
                                    <li>propose or decide how to spend our Crowdsale token fee</li>
                                    <li>
                                        propose or decide how to spend funds not claimed one year after the Crowdsale
                                        closes
                                    </li>
                                    <li>decide how to invest unclaimed tokens after the Incentive program ends</li>
                                </ul>
                            </li>
                            <li>Right to have a discount on platform fee when start a Crowdsale</li>
                            <li>Right to rate Crowdsales started on FriendsFingers</li>
                            <li>Possibility to promote Crowdsale on FriendsFingers social and media channels</li>
                        </ul>
                        <p>
                            We may always add rights for token holders, in that case we will communicate them on our
                            official channels.
                        </p>
                    </b-card-text>
                </b-card>
                <b-card title="Risk Factors" class="mb-3">
                    <b-card-text>
                        <p>
                            The purchase of tokens involves a high degree of risk. Before acquiring tokens, it is
                            recommended that each participant carefully weighs all the information and risks detailed in
                            this Whitepaper, and, specifically, the following risk factors.
                        </p>
                        <ul>
                            <li>
                                Dependence on infrastructure: Ethereum and the Internet implies that FriendsFingers can
                                offer no assurances that a system failure would not adversely affect our software.
                                Break-ins, network delays or other disruptions caused by third parties may result in
                                interruption, delay or suspension of services, which would limit the use of the tokens.
                            </li>
                            <li>
                                Smart contract limitations: Smart contract technology is still in its early stages of
                                development, and its application is of experimental nature. This may carry significant
                                operational, technological, regulatory, reputational and financial risks. FriendsFingers
                                cannot serve as any form of warranty, including any expressed or implied warranty that
                                the FriendsFingers Smart Contract is fit for purpose or that it contains no flaws,
                                vulnerabilities or issues which could cause technical problems or the complete loss of
                                tokens or funds.
                            </li>
                            <li>
                                Regulatory risks: Blockchain technology, including but not limited to the issue of
                                tokens, may be a new concept in some jurisdictions, which may then apply existing laws
                                or introduce new regulations regarding Blockchain technology-based applications, and
                                such regulations may conflict with the current FriendsFingers smart contracts and token
                                concept. This may result in the need to make substantial modifications to our smart
                                contract, including but not limited to its termination, the loss of tokens, and the
                                suspension or termination of all token functions.
                            </li>
                            <li>
                                Taxes: Token holders may be required to pay taxes associated with the transactions
                                contemplated herein in their home countries. It will be a sole responsibility of token
                                holders to comply with the tax laws of their jurisdictions applicable to them and pay
                                all relevant taxes.
                            </li>
                            <li>
                                Force Majeure: FriendsFingers’ performance may be interrupted, suspended or delayed due
                                to force majeure circumstances. For the purposes of this Whitepaper, force majeure shall
                                mean extraordinary events and circumstances which could not be prevented by us and shall
                                include: acts of nature, wars, armed conflicts, mass civil disorders, industrial
                                actions, epidemics, lockouts, slowdowns, prolonged shortage or other failures of energy
                                supplies or communication service, acts of municipal, state or federal governmental
                                agencies, other circumstances beyond our control, which were not in existence at the
                                time of Whitepaper release. If such circumstances occur prior to the issue of tokens and
                                FriendsFingers is unable to issue tokens within one month from the projected date, the
                                escrow agent may issue a refund at the request of the token purchasers. The refund will
                                be issued in the original amount and form of payment to the same digital wallet where
                                the funds were transferred from.
                            </li>
                            <li>
                                Disclosure of information: Personal information received from token holders, the
                                information about the number of tokens owned, the wallet addresses used, and any other
                                relevant information may be disclosed to law enforcement, government officials, and
                                other third parties when FriendsFingers is required to disclose such information by law
                                ,subpoena, or court order (also if all informations are already public due the nature of
                                the blockchain and our use of it). FriendsFingers shall at no time be held responsible
                                for such information disclosure.
                            </li>
                            <li>
                                Value of token: Once purchased, the value of the token may significantly fluctuate due
                                to various reasons. FriendsFingers does not guarantee any specific value of the token
                                over any specific period of time. FriendsFingers shall not be held responsible for any
                                change in the value of the token.
                            </li>
                            <li>
                                Started Crowdsale: Except all regarding its own crowdsale and explicitly expressed in
                                this Whitepaper, FriendsFingers does not guarantee any responsibility on crowdsale
                                started by third party. FriendsFingers offers only technology and development tools, so
                                projects seeking to conduct their own crowdsale. FriendsFingers has no control over the
                                actions of the projects’ teams. FriendsFingers will provide its tools to any project,
                                however, FriendsFingers shall not be responsible for the completion or success of any
                                crowdsale if such failure resulted from the actions of the projects’ teams or third
                                parties. Responsibility of any third party crowdsale is to be accomplished by crowdsale
                                creator and any other information on third party crowdsale shall be inferred by their
                                own Whitepaper and official links.
                            </li>
                            <li>
                                Ethereum volatility: FriendsFingers’ services are priced in Ethereum. The Ethereum
                                exchange rate volatility may impact the company's ability to provide services at the
                                indicated prices.
                            </li>
                        </ul>
                        <p>
                            Assumptions with respect to the foregoing involve, among other things, judgments about the
                            future economic, competitive and market conditions and business decisions, most of which are
                            beyond the control of the FriendsFingers team and therefore difficult or impossible to
                            accurately predict. Although the FriendsFingers team believes that its assumptions
                            underlying its forward-looking statements are reasonable, any of these may prove to be
                            inaccurate. As a result, the FriendsFingers team can offer no assurances that the
                            forward-looking statements contained in this Whitepaper will prove to be accurate. In light
                            of the significant uncertainties inherent in the forward-looking statements contained
                            herein, the inclusion of such information may not be interpreted as a warranty on the part
                            of FriendsFingers or any other entity that the objectives and plans of the FriendsFingers
                            project will be successfully achieved. Please note that the FriendsFingers project may be
                            subject to other risks not foreseen by its team at this time.
                        </p>
                    </b-card-text>
                </b-card>
                <b-card title="Legal" class="mb-3">
                    <b-card-text>
                        <p>
                            The Shaka token does not have the legal qualification of a security, since it does not give
                            any rights to dividends or interests. The sale of Shaka tokens is final and
                            non-refundable.
                        </p>
                        <p>
                            Shaka tokens are not shares and do not give any rights excluding what indicated in the Token
                            section of this Whitepaper. Shaka tokens cannot have a performance or a particular value
                            outside the FriendsFingers Platform. Shaka tokens shall therefore not be used or purchased
                            for speculative or investment purposes. The purchaser of Shaka tokens is aware that national
                            securities laws, which ensure that investors are sold investments that include all the
                            proper disclosures and are subject to regulatory scrutiny for the investors' protection, are
                            not applicable.
                        </p>
                        <p>
                            Anyone purchasing Shaka tokens expressly acknowledges and represents that she/he has
                            carefully reviewed this Whitepaper and fully understands the risks, costs and benefits
                            associated with the purchase of Shaka.
                        </p>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    name: 'Whitepaper',
  };
</script>
