const { nameNormalizator } = require('../user.util');

const nameNormalizatorSuccess = 'John Doe';

const nameNormalizatorTestData = [
    { input: 'JOHN DOE', output: nameNormalizatorSuccess },
    { input: 'John Doe', output: nameNormalizatorSuccess },
    { input: 'john doe', output: nameNormalizatorSuccess },
    { input: 'jOhN doE', output: nameNormalizatorSuccess },
    { input: 'jOhN-doE', output: nameNormalizatorSuccess },
    { input: 'jOhN        doE', output: nameNormalizatorSuccess },
    { input: 'jOhN  -@- doE', output: nameNormalizatorSuccess },
    { input: 'jOhN  -@- doE', output: nameNormalizatorSuccess },
    { input: 'jOhN  -@- doè', output: nameNormalizatorSuccess },
    { input: 'jOhN doé', output: nameNormalizatorSuccess },
    { input: 'jOhN.doé', output: nameNormalizatorSuccess },
    { input: 'j0hN doé', output: 'J0hn Doe' },
    { input: undefined, output: '' },
    { input: null, output: '' },
    { input: '', output: '' },
    { input: '+184930203874', output: '184930203874' }, // Will not works for phones
    { input: 'email@gmail.com', output: 'Email Gmail Com' }, // Will not works for emails
];

describe('Test user.util', () => {
    test('Test nameNormalizator function', () => {
        nameNormalizatorTestData.forEach((testObject) => {
            const normalizedName = nameNormalizator(testObject.input);
            expect(normalizedName).toBe(testObject.output);
        });
    });
});
