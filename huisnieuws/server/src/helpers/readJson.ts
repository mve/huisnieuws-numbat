import axios from 'axios';
import fs from 'fs';

const jsonUrl = 'https://geodata.nationaalgeoregister.nl/wijkenbuurten2020/ows?request=GetFeature&service=WFS&version=1.1.0&typeName=cbs_wijken_2020&outputFormat=application%2Fjson';

const getData = async () => {
  console.time('data');
  const result = await axios.get(jsonUrl);

  fs.writeFileSync('./output.json', JSON.stringify(result.data));
  console.info('Finished reading data.');
  console.timeEnd('data');
  console.info('Data can be found in server/output.json');
};

console.info('Reading data...');
getData();
