const App = {
    web3: null,
    web3Provider: null,
    etherscanLink: '',
    metamask: {
        installed: false,
        netId: null
    },
    contracts: {},

    init: function (demo) {
        if (typeof demo !== "undefined" && demo === true) {
            web3Provider = DEMO_web3Provider;
            etherscanLink = DEMO_etherscanLink;
            networkId = DEMO_networkId;
            networkName = DEMO_networkName;
            FriendsFingersBuilderAddress = DEMO_FriendsFingersBuilderAddress;
        }

        App.initWeb3(true);
    },

    initWeb3: function (checkWeb3) {
        App.etherscanLink = etherscanLink;
        if (checkWeb3 && typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            App.web3 = new Web3(App.web3Provider);
            App.metamask.installed = true;
            App.web3.version.getNetwork(function (err, netId) {
                App.metamask.netId = netId;
                if (netId !== networkId) {
                    App.initWeb3(false);
                }
            });
        } else {
            // set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider(web3Provider);
            App.web3 = new Web3(App.web3Provider);
        }
    },

    initBuilder: async function () {
        return await $.getJSON(abiPath + 'FriendsFingersBuilder.json', function (data) {
            App.contracts.FriendsFingersBuilder = TruffleContract(data);
            App.contracts.FriendsFingersBuilder.setProvider(App.web3Provider);
        });
    },

    initCrowdsale: async function () {
        return await $.getJSON(abiPath + 'FriendsFingersCrowdsale.json', function (data) {
            App.contracts.FriendsFingersCrowdsale = TruffleContract(data);
            App.contracts.FriendsFingersCrowdsale.setProvider(App.web3Provider);
        });
    },

    initToken: async function () {
        return $.getJSON(abiPath + 'FriendsFingersToken.json', function (data) {
            App.contracts.FriendsFingersToken = TruffleContract(data);
            App.contracts.FriendsFingersToken.setProvider(App.web3Provider);
        });
    },

    home: async function (crowdsaleAddress) {
        App.init();

        await App.initCrowdsale();

        new Vue({
            el: '#top-head',
            data: {
                contract: null,
                crowdsale: {
                    cap: 0,
                    weiRaised: 0,
                    progress: 0
                }
            },
            methods: {
                switchModule: async function () {
                    if (this.crowdsale.hasStarted) {
                        $('.timer').addClass('d-none');
                        $('#top-head').removeClass('d-none');
                        const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
                        this.crowdsale.cap = App.web3.fromWei(await crowdsale.cap()).valueOf();

                        this.getRaised();

                        const self = this;
                        setInterval(function () {
                            self.getRaised();
                        }, 5000);
                    } else {
                        new TimezZ('.j-timer', {
                            date: 'February 24, 2018 12:00:00',
                            daysName: 'DD',
                            hoursName: 'HH',
                            minutesName: 'MM',
                            secondsName: 'SS',
                            tagNumber: 'div',
                            tagLetter: 'div',
                            stop: false,
                        });
                        this.timeCheck();
                    }
                },
                timeCheck: function () {
                    this.crowdsale.hasStarted = Date.now() > this.crowdsale.startTime;

                    if (!this.crowdsale.hasStarted) {
                        const self = this;
                        setTimeout(function () {
                            self.timeCheck();
                        }, 1000);
                    } else {
                        this.switchModule();
                    }
                },
                getRaised: async function () {
                    const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
                    this.crowdsale.weiRaised = App.web3.fromWei(await crowdsale.weiRaised()).valueOf();
                    this.crowdsale.progress = this.crowdsale.weiRaised * 100 / this.crowdsale.cap;
                }
            },
            created: async function () {
                this.crowdsale.startTime = 1519470000 * 1000;
                this.crowdsale.hasStarted = Date.now() > this.crowdsale.startTime;
                this.switchModule();
            }
        });
    },

    bountyProgram: async function () {
        App.init();

        Vue.use(VeeValidate);

        new Vue({
            el: '#bounty-program',
            data: {
                address_error: false,
                copied: false,
                wallet: '',
                email: '',
                telegram: '',
                postlink: ''
            },
            methods: {
                subscribeBounty: function () {
                    this.address_error = (this.wallet !== '' && !App.web3.isAddress(this.wallet));

                    if (this.address_error) {
                        return;
                    }

                    this.$validator.validateAll().then(function (result) {

                        if (result) {
                            $('#mc-embedded-subscribe-form').submit();
                        } else {
                            console.log("some errors");
                        }
                    });
                },
                copyLink: function () {
                    if (this.wallet !== '' && !this.address_error) {
                        document.querySelector("#mce-LINK").select();
                        try {
                            this.copied = document.execCommand("copy");
                        } catch (err) {
                            this.copied = false;
                        }
                    }
                }
            },
            computed: {
                generateLink: function () {
                    this.address_error = (this.wallet !== '' && !App.web3.isAddress(this.wallet));
                    return (this.wallet === '' || this.address_error) ? '' : "https://www.friendsfingers.com/?utm_campaign=bounty&utm_source=" + this.wallet;
                }
            }
        });
    },

    builder: async function () {
        App.init(true);

        Vue.use(VeeValidate);
        await App.initBuilder();

        new Vue({
            el: '#crowdsale-start',
            data: {
                demo: true,
                minStartDate: '',
                maxStartDate: '',
                minEndDate: '',
                maxEndDate: '',
                txError: false,
                txHash: '',
                makingTransaction: false,
                formDisabled: false,
                crowdsale: {
                    id: '',
                    address: '',
                    projectInfo: {}
                },
                token: {}
            },
            created: function () {
                this.$validator.extend('eth_address', {
                    getMessage: field => 'Insert a valid Ethereum wallet address.',
                    validate: value => App.web3.isAddress(this.crowdsale.wallet)
                });
            },
            methods: {
                validateForm: function () {
                    return (
                        this.crowdsale.title !== undefined &&
                        this.crowdsale.url !== undefined &&
                        this.crowdsale.logo !== undefined &&
                        this.crowdsale.description !== undefined &&
                        this.crowdsale.goal > 0 &&
                        this.crowdsale.cap >= this.crowdsale.goal &&
                        this.crowdsale.rate > 0 &&
                        this.crowdsale.creatorSupply >= 0 &&
                        new Date(this.crowdsale.startTime).getTime() / 1000 > 0 && //insert date validation
                        this.crowdsale.endTime > this.crowdsale.startTime &&
                        App.web3.isAddress(this.crowdsale.wallet) &&
                        this.token.name !== undefined &&
                        this.token.symbol !== undefined &&
                        this.token.decimals >= 0
                    )
                },
                startCrowdsale: function () {
                    if (!App.metamask.installed) {
                        alert("To use the invest button please install MetaMask extension for Chrome or Firefox!");
                        return;
                    } else {
                        if (App.metamask.netId !== networkId) {
                            alert("Your MetaMask extension in on the wrong network. Please switch on " + networkName + " and try again!");
                            return;
                        }
                    }

                    this.$validator.validateAll().then(async (result) => {
                        //TODO check custom controls from validateform and then remove
                        if (result) {
                            console.log('starting');
                            const builder = await App.contracts.FriendsFingersBuilder.at(FriendsFingersBuilderAddress);

                            const name = this.token.name;
                            const symbol = this.token.symbol;
                            const decimals = new App.web3.BigNumber(this.token.decimals);
                            const cap = App.web3.toWei(this.crowdsale.cap, "ether");
                            const goal = App.web3.toWei(this.crowdsale.goal, "ether");
                            const creatorSupply = new App.web3.BigNumber(this.crowdsale.creatorSupply * Math.pow(10, this.token.decimals));
                            const startTime = new Date(this.crowdsale.startTime).getTime() / 1000;
                            const endTime = new Date(this.crowdsale.endTime).getTime() / 1000;
                            const rate = new App.web3.BigNumber(this.crowdsale.rate);
                            const wallet = this.crowdsale.wallet;

                            const crowdsaleInfo = JSON.stringify(this.crowdsale.projectInfo);

                            try {
                                this.txError = false;
                                this.txHash = '';
                                this.formDisabled = true;
                                this.makingTransaction = true;

                                const log = await builder.startCrowdsale(
                                    name,
                                    symbol,
                                    decimals,
                                    cap,
                                    goal,
                                    creatorSupply,
                                    startTime,
                                    endTime,
                                    rate,
                                    wallet,
                                    crowdsaleInfo
                                );

                                console.log(log);

                                this.txHash = log.tx;
                                this.trxLink = App.etherscanLink + "/tx/" + this.txHash;

                                await App.initCrowdsale();
                                const event = log.logs.find(e => e.event === 'CrowdsaleStarted');

                                if (typeof event === 'undefined') {
                                    this.txError = true;
                                    this.formDisabled = false;
                                    alert("Some error occurred. Maybe transaction failed for some reasons. Check your transaction id.");
                                    return;
                                }

                                const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(event.args.ffCrowdsale);

                                this.crowdsale.address = crowdsale.address;
                                this.crowdsale.id = parseInt(await crowdsale.id());

                            } catch (e) {
                                this.formDisabled = false;
                                alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
                            }
                        } else {
                            console.log("some errors");
                        }
                    });
                }
            }
        });
    },

    viewCrowdsale: async function (crowdsaleId) {
        App.init(true);

        Vue.use(VeeValidate);
        await App.initBuilder();
        await App.initCrowdsale();
        await App.initToken();

        new Vue({
            el: '#crowdsale-details',
            data: {
                demo: true,
                qrcodeVisible: false,
                copied: false,
                usAgreement: false,
                countryAgreement: false,
                globalAgreement: false,
                funds: 1,
                txHash: '',
                makingTransaction: false,
                crowdsaleAddress: 0,
                crowdsale: {
                    cap: 0,
                    goal: 0,
                    weiRaised: 0,
                    soldTokens: 0,
                    rate: 0,
                    startTime: 0,
                    endTime: 0,
                    hasStarted: false,
                    hasEnded: true,
                    paused: true,
                    projectInfo: {}
                },
                token: {
                    crowdsaleSupply: 0
                }
            },
            created: async function () {
                const builder = await App.contracts.FriendsFingersBuilder.at(FriendsFingersBuilderAddress);

                this.crowdsaleAddress = await builder.crowdsaleList(crowdsaleId);

                if (parseInt(this.crowdsaleAddress) === 0) {
                    window.location.href = window.location.origin + '/not-found';
                    return;
                }

                const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(this.crowdsaleAddress);
                const token = await App.contracts.FriendsFingersToken.at(await crowdsale.token());

                this.token.address = token.address;
                this.token.name = await token.name();
                this.token.symbol = await token.symbol();
                this.token.decimals = (await token.decimals()).valueOf();

                this.crowdsale.address = crowdsale.address;
                this.crowdsale.cap = App.web3.fromWei(await crowdsale.cap()).valueOf();
                this.crowdsale.goal = App.web3.fromWei(await crowdsale.goal()).valueOf();
                this.crowdsale.weiRaised = App.web3.fromWei(await crowdsale.weiRaised()).valueOf();
                this.crowdsale.rate = (await crowdsale.rate()).valueOf();
                this.crowdsale.soldTokens = (App.web3.toWei(this.crowdsale.weiRaised) * this.crowdsale.rate) / Math.pow(10, this.token.decimals);
                this.crowdsale.startTime = (await crowdsale.startTime()).valueOf() * 1000;
                this.crowdsale.startTimeFormatted = new Date(this.crowdsale.startTime).toLocaleString();
                this.crowdsale.endTime = (await crowdsale.endTime()).valueOf() * 1000;
                this.crowdsale.endTimeFormatted = new Date(this.crowdsale.endTime).toLocaleString();
                this.crowdsale.projectInfo = JSON.parse(await crowdsale.crowdsaleInfo());
                this.crowdsale.hasStarted = Date.now() > this.crowdsale.startTime;
                this.crowdsale.hasEnded = await crowdsale.hasEnded();
                this.crowdsale.paused = await crowdsale.paused();

                this.token.crowdsaleSupply = this.crowdsale.cap * this.crowdsale.rate;

                $('.crowdsale-box').toggleClass('d-none');
            },
            methods: {
                viewQRCode: function () {
                    if (!this.qrcodeVisible) {
                        const qr = document.getElementById("crowdsale-qrcode");
                        new QRCode(qr, this.crowdsale.address);
                        this.qrcodeVisible = true;
                    }
                },
                copyAddress: function () {
                    if (this.wallet !== '' && !this.address_error) {
                        document.querySelector("#crowdsale-address").select();
                        try {
                            this.copied = document.execCommand("copy");
                        } catch (err) {
                            this.copied = false;
                        }
                    }
                },
                fundCrowdsale: async function () {
                    if (!App.metamask.installed) {
                        alert("To use the invest button please install MetaMask extension for Chrome or Firefox!");
                        return;
                    } else {
                        if (App.metamask.netId !== networkId) {
                            alert("Your MetaMask extension in on the wrong network. Please switch on " + networkName + " and try again!");
                            return;
                        }
                    }

                    this.$validator.validateAll().then(async (result) => {

                        if (result) {
                            const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(this.crowdsaleAddress);
                            const value = App.web3.toWei(this.funds);
                            try {
                                this.txHash = '';
                                this.makingTransaction = true;
                                const log = await crowdsale.send(value);

                                console.log(log);

                                this.txHash = log.tx;
                                this.trxLink = App.etherscanLink + "/tx/" + this.txHash;
                            } catch (e) {
                                alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
                                this.makingTransaction = false;
                            }
                        } else {
                            console.log("some errors");
                        }
                    });
                }
            }
        });
    },

    shakaTokenSale: async function (crowdsaleAddress) {
        App.init();

        Vue.use(VeeValidate);
        await App.initCrowdsale();
        await App.initToken();

        new Vue({
            el: '#crowdsale-details',
            data: {
                demo: false,
                qrcodeVisible: false,
                copied: false,
                usAgreement: false,
                countryAgreement: false,
                globalAgreement: false,
                funds: 1,
                txHash: '',
                trxLink: '',
                makingTransaction: false,
                crowdsale: {
                    cap: 0,
                    goal: 0,
                    weiRaised: 0,
                    soldTokens: 0,
                    rate: 0,
                    startTime: 0,
                    endTime: 0,
                    hasStarted: false,
                    hasEnded: true,
                    paused: true,
                    projectInfo: {}
                },
                token: {
                    crowdsaleSupply: 0
                }
            },
            created: async function () {
                const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
                const token = await App.contracts.FriendsFingersToken.at(await crowdsale.token());

                this.token.address = token.address;
                this.token.name = "Shaka";
                this.token.symbol = "HAK";
                this.token.decimals = 18;

                this.crowdsale.address = crowdsale.address;
                this.crowdsale.cap = 2000;
                this.crowdsale.goal = 0;
                this.crowdsale.weiRaised = App.web3.fromWei(await crowdsale.weiRaised()).valueOf();
                this.crowdsale.rate = 4800;
                this.crowdsale.soldTokens = (App.web3.toWei(this.crowdsale.weiRaised) * this.crowdsale.rate) / Math.pow(10, this.token.decimals);
                this.crowdsale.startTime = 1519470000 * 1000;
                this.crowdsale.startTimeFormatted = new Date(this.crowdsale.startTime).toLocaleString();
                this.crowdsale.endTime = 1521889200 * 1000;
                this.crowdsale.endTimeFormatted = new Date(this.crowdsale.endTime).toLocaleString();
                this.crowdsale.projectInfo = JSON.parse(await crowdsale.crowdsaleInfo());
                this.crowdsale.hasStarted = Date.now() > this.crowdsale.startTime;
                this.crowdsale.hasEnded = await crowdsale.hasEnded();
                this.crowdsale.paused = await crowdsale.paused();

                this.token.crowdsaleSupply = this.crowdsale.cap * this.crowdsale.rate;

                $('.crowdsale-box').toggleClass('d-none');
            },
            methods: {
                viewQRCode: function () {
                    if (!this.qrcodeVisible) {
                        const qr = document.getElementById("crowdsale-qrcode");
                        new QRCode(qr, this.crowdsale.address);
                        this.qrcodeVisible = true;
                    }
                },
                copyAddress: function () {
                    if (this.wallet !== '' && !this.address_error) {
                        document.querySelector("#crowdsale-address").select();
                        try {
                            this.copied = document.execCommand("copy");
                        } catch (err) {
                            this.copied = false;
                        }
                    }
                },
                fundCrowdsale: async function () {
                    if (!App.metamask.installed) {
                        alert("To use the invest button please install MetaMask extension for Chrome or Firefox!");
                        return;
                    } else {
                        if (App.metamask.netId !== networkId) {
                            alert("Your MetaMask extension in on the wrong network. Please switch on " + networkName + " and try again!");
                            return;
                        }
                    }

                    this.$validator.validateAll().then(async (result) => {

                        if (result) {
                            const crowdsale = await App.contracts.FriendsFingersCrowdsale.at(crowdsaleAddress);
                            const value = App.web3.toWei(this.funds);
                            try {
                                this.txHash = '';
                                this.makingTransaction = true;
                                const log = await crowdsale.send(value);

                                console.log(log);

                                this.txHash = log.tx;
                                this.trxLink = App.etherscanLink + "/tx/" + this.txHash;
                            } catch (e) {
                                alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
                                this.makingTransaction = false;
                            }
                        } else {
                            console.log("some errors");
                        }
                    });
                }
            }
        });
    }
};

(function($) {
    "use strict";

    switch (page) {
        case "bounty-program":
            App.bountyProgram();
            break;

        case "shaka-token-sale":
            App.shakaTokenSale(FriendsFingersTokenSaleAddress);
            break;

        case "crowdsale-builder-demo":
            App.builder();
            break;

        case "crowdsale-demo":
            const pathArray = window.location.pathname.split( '/' );
            if (typeof pathArray[2] !== "undefined" && pathArray[2] !== '') {
                App.viewCrowdsale(pathArray[2]);
            } else {
                window.location.href = window.location.origin + '/not-found';
            }
            break;

        case "": //home
            App.home(FriendsFingersTokenSaleAddress);
            break;
    }

})(jQuery); // End of use strict