import _ from 'underscore';
import init from './Initialize';

init();
export const columns = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
export const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
export const allChips = _.combine(rows, columns).map(val => { return val[0] + val[1] });