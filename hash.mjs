function hashMap() {
    const hashArray = [];
    let capacity = 16;
    const loadFactor = 0.75;
    let entryCount = 0;

    const hash = function keyToHash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }
     
        return hashCode;
    };

    const getKey = function getKeyFromNode(node) {
        return node.key;
    };

    const getValue = function getValueFromNode(node) {
        return node.value;
    };

    const getKeyValue = function getKeyAndValueFromNode(node) {
        return [node.key, node.value];
    };

    const loopIndex = function loopThroughIndexGiven(node, func) {
        const tempArray = [];
        let currentNode = node;
        tempArray.push(func(currentNode));

        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
            tempArray.push(func(currentNode));
        }

        return tempArray;
    };

    const length = function getNumberOfKeys() {
        return entryCount;
    };

    const clear = function fullyClearArrayOfKeys() {
        hashArray.length = 0;
        entryCount = 0;
    };

    const keys = function getAllKeysFromArray() {
        const allKeys = hashArray.map((node) => {
            if (!node) {
                return null;
            }
            return loopIndex(node, getKey);
        }).flat().filter((node) => node != null);

        return allKeys;
    };

    const values = function getAllValuesFromArray() {
        const allValues = hashArray.map((node) => {
            if (!node) {
                return null;
            }
            return loopIndex(node, getValue);
        }).flat().filter((node) => node != null);

        return allValues;
    };

    const entries = function getAllentryCountInArray() {
        const allEntries = hashArray.map((node) => {
            if (!node) {
                return null;
            }
            return loopIndex(node, getKeyValue);
        }).flat().filter((node) => node != null);

        return allEntries;
    };

    const searchFor = function searchForKeyInArray(key) {
        const hashedKey = hash(key);

        if (hashedKey < 0 || hashedKey >= capacity) {
            throw new Error("Trying to access index out of bound");
        }

        if (!hashArray[hashedKey]) {
            return null;
        }

        let currentNode = hashArray[hashedKey];

        while (currentNode != null) {
            if (currentNode.key === key) {
                break;
            }

            currentNode = currentNode.nextNode;
        }

        return currentNode;
    };

    const set = function insertKeyAndValueIntoHashMap(key, value) {
        if ((capacity * loadFactor) < (entryCount + 1)) {
            const allEntries = entries();
            capacity = capacity * 2;
            clear();
            allEntries.forEach((entry) => set(entry[0], entry[1]));
        }

        const hashedKey = hash(key);

        if (hashedKey < 0 || hashedKey >= capacity) {
            throw new Error("Trying to access index out of bound");
        }

        if (!hashArray[hashedKey]) {
            hashArray[hashedKey] = { 
                key: key,
                value: value,
                nextNode: null,
            }

            entryCount += 1;
            return;
        }

        let currentNode = hashArray[hashedKey];
        
        if (currentNode.key === key) {
            currentNode.value = value;
            return;
        }

        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
            if (currentNode.key === key) {
                currentNode.value = value;
                return;
            }
        }

        currentNode.nextNode = {
            key: key,
            value: value,
            nextNode: null,
        }

        entryCount += 1;
    };

    const get = function getValueWithKey(key) {
        const searchResult = searchFor(key);

        if (searchResult === null) {
            return null;
        }

        return searchResult.value;
    };

    const has = function arrayHasKey(key) {
        const searchResult = searchFor(key);

        if (searchResult === null) {
            return false;
        }

        return true;
    };

    const remove = function removeEntryFromArray(key) {
        const hashedKey = hash(key);

        if (hashedKey < 0 || hashedKey >= capacity) {
            throw new Error("Trying to access index out of bound");
        }

        if (!hashArray[hashedKey]) {
            return false;
        }

        let currentNode = hashArray[hashedKey];
        let afterNode = currentNode.nextNode;

        if (currentNode.key === key) {
            if (afterNode === null) {
                hashArray[hashedKey] = null;
                entryCount -= 1;
                return true;
            }

            hashArray[hashedKey] = afterNode;
            entryCount -= 1;
            return true;
        }

        while (afterNode != null) {
            if (afterNode.key === key) {
                break;
            }
            currentNode = afterNode;
            afterNode = afterNode.nextNode;

        }

        if (afterNode === null) {
            return false;
        }

        if (afterNode.nextNode === null) {
            currentNode.nextNode = null;
            entryCount -= 1;
            return true;
        }

        currentNode.nextNode = afterNode.nextNode;
        entryCount -= 1;
        return true;

    };

    const getMap = function getMapArr() {
        return hashArray;
    }

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
        getMap,
        hash,
    }
}

const test = hashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')

console.log(test.remove("moon"))
console.log(test.length())
test.set('lion', 'silver')

console.log(test.getMap())



