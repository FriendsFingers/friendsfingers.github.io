import ERC20 from '../abi/ERC20';
import TokenArtifact from '../abi/BaseToken';
import FaucetArtifact from '../abi/TokenFaucet';
import DAOArtifact from '../abi/DAO';
import DealerArtifact from '../abi/TokenDealer';
import ContributionsArtifact from '../abi/Contributions';

export default {
  state: {
    address: '',
    legacy: false,
    currentNetwork: '',
    web3Provider: null,
    dapp: {
      fallbackAddress: '0x0000000000000000000000000000000000000001',
      web3: null,
      metamask: {
        address: '',
        installed: false,
        netId: null,
      },
      network: {
        default: __DEFAULT_NETWORK__,
        current: null,
        map: {
          1: 'mainnet',
          3: 'ropsten',
          4: 'rinkeby',
          42: 'kovan',
        },
        list: {
          mainnet: {
            web3Provider: `https://mainnet.infura.io/v3/${__INFURA_KEY__}`,
            etherscanLink: 'https://etherscan.io',
            id: '1',
            name: 'Main Ethereum Network',
            color: 'success',
          },
          ropsten: {
            web3Provider: `https://ropsten.infura.io/v3/${__INFURA_KEY__}`,
            etherscanLink: 'https://ropsten.etherscan.io',
            id: '3',
            name: 'Ropsten Test Network',
            color: 'danger',
          },
          rinkeby: {
            web3Provider: `https://rinkeby.infura.io/v3/${__INFURA_KEY__}`,
            etherscanLink: 'https://rinkeby.etherscan.io',
            id: '4',
            name: 'Rinkeby Test Network',
            color: 'warning',
          },
          kovan: {
            web3Provider: `https://kovan.infura.io/v3/${__INFURA_KEY__}`,
            etherscanLink: 'https://kovan.etherscan.io',
            id: '42',
            name: 'Kovan Test Network',
            color: 'primary',
          },
        },
      },
      contracts: {
        token: null,
        faucet: null,
        dao: null,
        dealer: null,
        contributions: null,
      },
      instances: {
        token: null,
        faucet: null,
        dao: null,
        dealer: null,
        contributions: null,
      },
    },
  },
  getters: {
    /*
    address (state) {
      return state.address;
    },
    */
    dapp (state) {
      return state.dapp;
    },
  },
  mutations: {
    /*
    setAddress (state, address) {
      localStorage.setItem('address', address);
      state.address = address;
    },
    */
  },
  actions: {
    init ({ state, commit }) {
      state.currentNetwork = state.dapp.network.default;
      state.dapp.network.current = state.dapp.network.list[state.currentNetwork];

      try {
        this.dispatch('initWeb3', true);
      } catch (e) {
        alert(e);
      }
    },
    load ({ commit }) {
      // commit('setAddress', localStorage.getItem('address') || null);
    },
    initWeb3 ({ state, commit }, checkWeb3) {
      if (!Object.prototype.hasOwnProperty.call(state.dapp.network.list, state.currentNetwork)) {
        throw new Error(
          `Failed initializing network ${state.currentNetwork}. Allowed values are mainnet, ropsten and rinkeby.`,
        );
      }

      return new Promise((resolve) => {
        if (checkWeb3 && (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined')) {
          if (window.ethereum) {
            console.log('injected web3'); // eslint-disable-line no-console
            state.web3Provider = window.ethereum;
          } else {
            console.log('injected web3 (legacy)'); // eslint-disable-line no-console
            state.web3Provider = window.web3.currentProvider;
            state.legacy = true;
          }

          state.dapp.web3 = new Web3(state.web3Provider);
          state.dapp.metamask.installed = true;
          state.dapp.web3.version.getNetwork(async (err, netId) => {
            if (err) {
              console.log(err); // eslint-disable-line no-console
            }

            state.dapp.metamask.netId = netId;

            if (netId !== state.dapp.network.list[state.currentNetwork].id) {
              state.dapp.network.current = state.dapp.network.list[state.dapp.network.map[netId]];
              return this.dispatch('initWeb3', false);
            }

            if (state.dapp.web3.eth.accounts[0]) {
              state.dapp.metamask.address = state.dapp.web3.eth.accounts[0];
            } else {
              if (!state.legacy) {
                const address = await state.web3Provider.send('eth_accounts');

                if (typeof address === 'string') {
                  state.dapp.metamask.address = address;
                } else if (address.length > 0 && !address.result) {
                  state.dapp.metamask.address = address[0];
                } else {
                  // eslint-disable-next-line require-atomic-updates
                  state.dapp.metamask.address = address.result && address.result.length > 0 ? address.result[0] : '';
                }

                state.web3Provider.on('accountsChanged', function (accounts) {
                  document.location.reload();
                });

                state.web3Provider.on('networkChanged', function (network) {
                  document.location.reload();
                });
              } else {
                state.dapp.metamask.address = state.dapp.web3.eth.accounts[0] || '';
              }
            }

            resolve();
          });
        } else {
          console.log('provided web3'); // eslint-disable-line no-console
          state.dapp.network.current = state.dapp.network.list[state.currentNetwork];
          state.web3Provider = new Web3.providers.HttpProvider(
            state.dapp.network.list[state.currentNetwork].web3Provider,
          );
          state.dapp.web3 = new Web3(state.web3Provider);

          resolve();
        }
      });
    },
    initShakaToken ({ state, commit }) {
      state.dapp.contracts.token = state.dapp.web3.eth.contract(TokenArtifact.abi);
      state.dapp.instances.token = state.dapp.contracts.token.at(__TOKEN_ADDRESS__);
    },
    initDao ({ state, commit }) {
      state.dapp.contracts.dao = state.dapp.web3.eth.contract(DAOArtifact.abi);
      state.dapp.instances.dao = state.dapp.contracts.dao.at(__DAO_ADDESS__);
    },
    initDealer ({ state, commit }) {
      state.dapp.contracts.dealer = state.dapp.web3.eth.contract(DealerArtifact.abi);
      state.dapp.instances.dealer = state.dapp.contracts.dealer.at(__TOKEN_DEALER__);
    },
    initContributions ({ state, commit }) {
      state.dapp.contracts.contributions = state.dapp.web3.eth.contract(ContributionsArtifact.abi);
      state.dapp.instances.contributions = state.dapp.contracts.contributions.at(__CONTRIBUTIONS__);
    },
    initFaucet ({ state, commit }) {
      state.dapp.contracts.faucet = state.dapp.web3.eth.contract(FaucetArtifact.abi);
      state.dapp.instances.faucet = state.dapp.contracts.faucet.at(__FAUCET_ADDESS__);
    },
    loadERC20 ({ state, commit }) {
      state.dapp.contracts.erc20 = state.dapp.web3.eth.contract(ERC20.abi);
    },
    async connect ({ state, commit }) {
      try {
        if (state.dapp.web3.eth.accounts[0]) {
          state.dapp.metamask.address = state.dapp.web3.eth.accounts[0];
        } else {
          if (!state.legacy) {
            await state.web3Provider.enable();

            document.location.reload();
          } else {
            state.dapp.metamask.address = state.dapp.web3.eth.accounts[0] || '';
          }
        }
      } catch (e) {
        console.log(e); // eslint-disable-line no-console
        alert('Cannot connect. Please verify that you have MetaMask installed and unlocked.');
      }
    },
    disconnect ({ commit }) {
      console.log('TODO'); // eslint-disable-line no-console
    },
  },
};
