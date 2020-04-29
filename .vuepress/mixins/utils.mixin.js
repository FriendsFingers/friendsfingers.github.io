import QRCode from 'qrcode';

export default {
  data () {
    return {
      zeroAddress: '0x0000000000000000000000000000000000000000',
    };
  },
  computed: {
    dapp: {
      get () {
        return this.$store.getters.dapp;
      },
    },
  },
  methods: {
    getParam (param) {
      const vars = {};
      window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
          vars[key] = value !== undefined ? value : '';
        },
      );

      if (param) {
        return vars[param] ? vars[param] : null;
      }
      return vars;
    },
    ethGetCall (fn, ...args) {
      args.push({ from: this.dapp.fallbackAddress });

      return this.promisify(fn, ...args);
    },
    promisify (fn, ...args) {
      return new Promise((resolve, reject) => {
        fn(...args, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    },
    isMobile () {
      try {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      } catch (e) {
        return false;
      }
    },
    generateQRCode (value) {
      return QRCode.toDataURL(
        value,
        {
          color: {
            dark: '#b733a7',
            light: '#0000',
          },
        },
      );
    },
    makeToast (title, text, variant = null) {
      this.$bvToast.toast(text, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
    formatStructure (struct) {
      const memberId = parseInt(struct[0].valueOf());

      if (memberId === 0) {
        return null;
      }

      return {
        id: parseInt(struct[0].valueOf()),
        address: struct[1],
        fingerprint: this.formatFingerprint(struct[2]),
        creationDate: struct[3].valueOf() * 1000,
        stakedTokens: parseFloat(this.dapp.web3.fromWei(struct[4])),
        usedTokens: parseFloat(this.dapp.web3.fromWei(struct[5])),
        data: struct[6],
        approved: struct[7],
      };
    },
    formatFingerprint (fingerprint) {
      const chunk = fingerprint.replace('0x', '').match(new RegExp('.{1,6}', 'g'));

      return {
        borderColor: `#${chunk[0]}`,
        backgroundColor: `#${chunk[1]}`,
        mainColor: `#${chunk[2]}`,
      };
    },
  },
};
