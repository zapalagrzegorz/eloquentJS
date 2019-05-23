/* https://www.codingame.com/ide/puzzle/encryptiondecryption-of-enigma-machine */
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * */
interface Message {
  password: string[];
  getPassword(): string;
  rotoringEncoding(this: Message, rotors: string[]): Message;
  rotoringDecoding(this: Message, input: string, rotors: string[]): Message;
  cesarShifting(this: Message, input: string, shift: number): Message;
  cesarUnshifting(this: Message, shift: number): Message;
}

const operation = 'DECODE';
const pseudoRandomNumber = 9;
const rotors = [
  'BDFHJLCPRTXVZNYEIWGAKMUSQO',
  'AJDKSIRUXBLHWTMCQGZNPYFVOE',
  'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
];

const message = 'PQSACVVTOISXFXCIAMQEM';

const Message: Message = {
  password: [],
  getPassword() {
    return this.password.join('');
  },
  rotoringEncoding: function rotoringEncoding(this: Message, rotors: string[]): Message {
    this.password = this.password
      .map(value => rotors[0][value.charCodeAt(0) - 65])
      .map(value => rotors[1][value.charCodeAt(0) - 65])
      .map(value => rotors[2][value.charCodeAt(0) - 65]);

    return Object.assign({}, this);
  },

  rotoringDecoding: function rotoringDecoding(
    this: Message,
    input: string,
    rotors: string[],
  ): Message {
    this.password = input
      .split('')
      .map(value => String.fromCharCode(rotors[2].indexOf(value) + 65))
      .map(value => String.fromCharCode(rotors[1].indexOf(value) + 65))
      .map(value => String.fromCharCode(rotors[0].indexOf(value) + 65));
    return Object.assign({}, this);
  },

  cesarShifting: function cesarShifting(input: string, shift: number) {
    this.password = input.split('').map((value, index) => {
      let UTFcharCode = value.charCodeAt(0) + index + shift;

      if (UTFcharCode <= 90) {
        return String.fromCharCode(UTFcharCode);
      }

      while (UTFcharCode > 90) {
        UTFcharCode -= 26;
      }
      return String.fromCharCode(UTFcharCode);
    });
    return Object.assign({}, this);
  },

  cesarUnshifting: function cesarShifting(this: Message, shift: number): Message {
    this.password = this.password.map((value, index) => {
      let UTFcharCode = value.charCodeAt(0) - index - shift;

      if (UTFcharCode >= 65 && UTFcharCode <= 90) {
        return String.fromCharCode(UTFcharCode);
      }

      while (UTFcharCode < 65) {
        UTFcharCode += 26;
      }

      while (UTFcharCode > 90) {
        UTFcharCode -= 26;
      }

      return String.fromCharCode(UTFcharCode);
    });
    return this;
  },
};

if (String(operation) === 'ENCODE') {
  console.log(
    Message.cesarShifting(message, pseudoRandomNumber)
      .rotoringEncoding(rotors)
      .getPassword(),
  );
} else {
  console.log(
    Message.rotoringDecoding(message, rotors)
      .cesarUnshifting(pseudoRandomNumber)
      .getPassword(),
  );
}