<template>
    <div>
        <b-row class="masthead peach m-0">
            <b-col lg="10" offset-lg="1">
                <h2>
                    <b-img :src="$withBase('/assets/images/logo/friendsfingers-light.svg')"
                           rounded="circle"
                           height="64"
                           :alt="$site.title"/><br>
                    FriendsFingers
                </h2>
                <h1 class="display-4">
                    Crowdfund your idea in a few steps
                </h1>
                <hr>
                <h5>{{ $site.description }}</h5>
            </b-col>
            <b-col lg="8" offset-lg="2">
                <b-btn :to="$withBase('/dao')" variant="action" size="lg" class="my-5">
                    Enter our DAO
                </b-btn>
                <b-btn v-on:click="comingSoon" variant="outline-light" size="lg" class="my-5">
                    Start your Crowdsale
                </b-btn>
            </b-col>
            <b-col lg="8" offset-lg="2">
                <ui--social-links class="inverse"></ui--social-links>
            </b-col>
        </b-row>
        <b-row class="masthead white m-0">
            <b-col lg="8" offset-lg="2">
                <h4 class="display-3">
                    <font-awesome-icon icon="rocket"/>
                    <br>Have a great project?
                </h4>
            </b-col>
            <b-col lg="6" offset-lg="3">
                <p class="lead mt-4">
                    Do you already have ideas that you want to develop on Ethereum or simply
                    do you want to raise funds for your project?<br><br>
                    With FriendsFingers you will be able to create your Ethereum based
                    Crowdsale without coding.<br><br>
                    Setup your Crowdsale start and end time, target and goal.<br>
                    <b>No payments required.</b>
                    We will take a max of 5% fee only on success campaigns.
                </p>
            </b-col>
        </b-row>
        <b-row class="masthead yellow m-0">
            <b-col lg="8" offset-lg="2">
                <h4 class="display-3">
                    <font-awesome-icon icon="people-arrows"/>
                    <br>Who would send money to someone they don’t trust?
                </h4>
            </b-col>
            <b-col lg="8" offset-lg="2">
                <h4>
                    Fund your project with a trustworthy crowdsale.
                </h4>
                <p class="lead mt-4">
                    Using FriendsFingers, you can easily deploy a Smart Contract that will hold contributor's
                    money until any given date or goal is reached.
                    Depending on the outcome, the funds will either be released to the project owners or
                    safely returned back to the contributors.<br><br>
                    Everything is possible without requiring a centralized arbitrator, clearing house
                    or having to trust anyone.
                    You can even use the token you create to keep track of the distribution of rewards.
                </p>
            </b-col>
        </b-row>
        <b-row class="masthead m-0">
            <b-col lg="8" offset-lg="2">
                <b-card-group deck>
                    <b-card>
                        <h4 class="display-3">
                            <font-awesome-icon icon="cogs"/>
                        </h4>
                        <b-card-title>
                            Start Crowdsale
                        </b-card-title>
                        <b-card-text>
                            In a few step you will be able to easily setup any informations
                        </b-card-text>
                    </b-card>

                    <b-card>
                        <h4 class="display-3">
                            <font-awesome-icon icon="chart-line"/>
                        </h4>
                        <b-card-title>
                            View Statistics
                        </b-card-title>
                        <b-card-text>
                            Follow your progress, the raised amount, the campaign status and many other informations
                        </b-card-text>
                    </b-card>
                </b-card-group>
                <b-card-group deck class="mt-4">
                    <b-card>
                        <h4 class="display-3">
                            <font-awesome-icon icon="award"/>
                        </h4>
                        <b-card-title>
                            Reach your goal
                        </b-card-title>
                        <b-card-text>
                            Receive funds in your wallet if you reach the goal
                        </b-card-text>
                    </b-card>

                    <b-card>
                        <h4 class="display-3">
                            <font-awesome-icon icon="wallet"/>
                        </h4>
                        <b-card-title>
                            Claim Refund
                        </b-card-title>
                        <b-card-text>
                            If campaign doesn't reach the goal, contributors can easily claim their funds back
                        </b-card-text>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  import utils from '../mixins/utils.mixin';

  export default {
    name: 'Home',
    mixins: [
      utils,
    ],
    methods: {
      comingSoon () {
        this.makeToast(
          'Coming Soon!',
          'Crowdsale Builder is under construction. Follow us to be updated!',
          'info',
        );
      },
    },
  };
</script>
