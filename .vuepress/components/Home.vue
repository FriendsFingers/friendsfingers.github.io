<template>
    <div>
        <b-row class="masthead purple m-0">
            <b-col lg="8" offset-lg="2">
                <h1 class="display-4">
                    Crowdfund your idea in a few steps
                </h1>
                <h5>{{ $site.description }}</h5>
            </b-col>
        </b-row>
        <b-row class="masthead yellow m-0">
            <b-col lg="8" offset-lg="2">
                <h4>
                    Have a great project?
                </h4>
                <p class="lead">
                    Do you already have ideas that you want to develop on Ethereum or simply
                    do you want to raise funds for your project?<br>
                    With FriendsFingers you will be able to create your Ethereum based
                    Crowdsale without coding.<br>
                    Setup your Crowdsale start and end time, target and goal.<br>
                    <b>No payments required.</b>
                    We will take a max of 5% fee only on success campaigns.
                </p>
            </b-col>
        </b-row>
        <b-row class="masthead white m-0">
            <b-col lg="8" offset-lg="2">
                <h4>
                    Who would send money to someone they don’t trust?
                </h4>
                <p class="lead">
                    Fund your project with a trustworthy crowdsale.<br>
                    Using FriendsFingers, you can easily deploy a Smart Contract that will hold contributor's
                    money until any given date or goal is reached.<br>
                    Depending on the outcome, the funds will either be released to the project owners or
                    safely returned back to the contributors.<br>
                    All of this is possible without requiring a centralized arbitrator, clearing house
                    or having to trust anyone.<br>
                    You can even use the token you create to keep track of the distribution of rewards.
                </p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  export default {
    name: 'Home',
  };
</script>
