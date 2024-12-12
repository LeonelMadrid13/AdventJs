
/**
 * 
 * 
 * MOV x y: Copies the value x (which can be a number or the content of a register) into register y
 * INC x: Increments the content of register x by 1
 * DEC x: Decrements the content of register x by 1
 * JMP x y: If the value in register x is 0, then jumps to the instruction at index y and continues executing the program from there.
 * 
 * 
/**
 * @param {string[]} instructions - The instructions to execute
 * @returns {number} The value of the register A
 */
function compile(instructions) {
    // Helper function: Parses the instructions
    const parseInstructions = (instructions) => {
        return instructions.map(instruction => instruction.split(' '));
    };

    // Helper function: Initializes a register if not already present
    const initializeRegister = (registers, registerName) => {
        if (!Object.hasOwn(registers, registerName)) {
            registers[registerName] = 0;
        }
    };

    // Helper function: Executes MOV instruction
    const executeMOV = (registers, instruction) => {
        const [_, source, destination] = instruction;
        if (registers[source] === undefined && !isNaN(Number(source))) {
            registers[destination] = Number(source);
        } else {
            registers[destination] = registers[source];
        }
    };

    // Helper function: Executes INC instruction
    const executeINC = (registers, instruction) => {
        const [_, registerName] = instruction;
        registers[registerName]++;
    };

    // Helper function: Executes DEC instruction
    const executeDEC = (registers, instruction) => {
        const [_, registerName] = instruction;
        registers[registerName]--;
    };

    // Helper function: Executes JMP instruction
    const executeJMP = (registers, instruction, currentIndex) => {
        const [_, registerName, targetIndex] = instruction;
        if (registers[registerName] === 0) {
            return Number(targetIndex);
        }
        return currentIndex + 1;
    };

    // Main logic of the compile function
    const parsedInstructions = parseInstructions(instructions);
    let registers = {};
    let i = 0;
    //
    while (i < parsedInstructions.length) {
        const instruction = parsedInstructions[i];
        const operation = instruction[0];

        operation === 'MOV' ? initializeRegister(registers, instruction[2]) : initializeRegister(registers, instruction[1]);
        switch (operation) {
            case 'MOV':
                executeMOV(registers, instruction);
                break;
            case 'INC':
                executeINC(registers, instruction);
                break;
            case 'DEC':
                executeDEC(registers, instruction);
                break;
            case 'JMP':
                i = executeJMP(registers, instruction, i);
                continue;
        }
        i++;
    }

    return registers['A'] !== undefined ? registers['A'] : undefined;
}


const instructions = [
  'MOV -1 C', // copies -1 to register 'C',
  'INC C', // increments the value of register 'C'
  'JMP C 1', // jumps to the instruction at index 1 if 'C' is 0
  'MOV C A', // copies register 'C' to register 'A',
  'INC A' // increments the value of register 'A'
]

console.log(compile(instructions)) // -> 2

/**
 Step-by-step execution:
 0: MOV -1 C -> The register C receives the value -1
 1: INC C    -> The register C becomes 0
 2: JMP C 1  -> C is 0, jumps to the instruction at index 1
 1: INC C    -> The register C becomes 1
 2: JMP C 1  -> C is 1, the instruction is ignored
 3: MOV C A  -> Copies register C to A. Now A is 1
 4: INC A    -> The register A becomes 2
 */

const instructions2 = [
    "JMP A 2",
    "MOV -1 B",
    "INC B",
    "JMP B 1",
    "MOV B A"
]
// console.log(compile(instructions2)) // -> 1

const instructions3 = [
    "INC A",
    "INC A",
    "DEC A",
    "MOV A B",
]

// console.log(compile(instructions3)) // -> 1