# Number-translator

## How to use:
```javascript
    const { translateNumber } = require("number-translator");
    
    translateNumber(x)        // where x is number OR (empty) string of numbers.
    translateNumber(123)      // —> "сто двадцать три"
    translateNumber("123")    // —> "сто двадцать три"
    translateNumber(-1.23)    // —> "минус одна целая двадцать три сотых"
    translateNumber(2231.1)   // —> "две тысяча двести тридцать одна целая сорок два сотых"
```
###### And that' all!
---

## Limits
#### Integer
Input may be 306 digits long. Maximal integer is "999...9" —> "девятьсот девяносто девять центиллионов ... девять"

#### Non-integer
Input may have 306 digits long integer part and 305 digits long non-integer part. 
Maximal non-integer is "999...9.999...9" — "девятьсот девяносто девять центиллионов ... девять целых девятьсот девяносто девять центиллионов ... девять стоцентиллионных"

#### Negative
The same rules apply for negative numbers.

### Live demo: 
https://hstff.csb.app/