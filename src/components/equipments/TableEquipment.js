import React from 'react';
import R from "ramda";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

class EquipmentsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      equipments: '1'
    }
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  render() {
    return (
      <Table>
        <TableBody>
         {R.values(this.state.equipments).map(equipment => {
           return (
             <TableRow
               hover
               onClick={''}
               key={equipment.id}
             >
               <TableCell>
                 <Checkbox />
               </TableCell>
               <TableCell primary={`${equipment.TypeEq}`}></TableCell>
             </TableRow>
           )
         })}
        </TableBody>
      </Table>
    )
  }
}

export default EquipmentsList;