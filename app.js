var app = new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      // For reset the game
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },

    attack: function () {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage

      // unshift: push to the begin of array 配列の一番最初(左)に要素が追加される
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster for " + damage
      });

      // will stop attacking if someone's HP <=0(`return true` in checkwin)
      if (this.checkWin()) {
        return;
      }
      this.playerHealth -= this.calculateDamage(5, 12)
      this.checkWin();

    },
    specialAttack: function () {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster hard for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();

    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player hearls for 10 "
      });
      this.monsterAttack();
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },
    monsterAttack: function () {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();

      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits player for " + damage
      });
    },

    // Math.max: range the max and min number. if the random result is 2 (0.1 * 10 = 1 +1) => 3
    // Math floor: 小数点切り下げ
    // Math.random: Generate random number between 0~1
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true
      } else if (this.playerHealth <= 0) {
        if (confirm('you lost? New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true
      }
      // continue to attacking in attack function
      return false;
    }

  }

})