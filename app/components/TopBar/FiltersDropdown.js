import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Grid, Checkbox, Button } from 'semantic-ui-react';
import {
  ListColumn,
  SaveButton,
  FieldLabel,
  DatePickerWrap,
  GridWrap
} from "./styles";

class FiltersDropdown extends Component {
  render() {
    const { filters = {}, onSave, onChangeDate, onChange, onChangeAll, dateFrom, dateTo, all } = this.props;

    return (
      <GridWrap>
        <Grid.Row style={{paddingBottom: 0}}>
          <Grid.Column width={8}>
            <ListColumn>
              <FieldLabel>From Date</FieldLabel>
              <DatePickerWrap
                selected={dateFrom}
                onChange={onChangeDate('from')}
              />
            </ListColumn>
          </Grid.Column>
          <Grid.Column width={8}>
            <ListColumn>
              <FieldLabel>To Date</FieldLabel>
              <DatePickerWrap
                selected={dateTo}
                onChange={onChangeDate('to')}
              />
            </ListColumn>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{paddingTop: 0}}>
          <Grid.Column width={8}>
            <ListColumn>
              <Checkbox checked={all > 0} indeterminate={all === 0} label="ALL" onChange={onChangeAll} />
              {map(filters.leftColumn, (item, index) => (
                <Checkbox checked={item.value} key={index} label={item.text} onChange={onChange('leftColumn', item)} />
              ))}
            </ListColumn>
          </Grid.Column>
          <Grid.Column width={8}>
            <ListColumn>
              {map(filters.rightColumn, (item, index) => (
                <Checkbox checked={item.value} key={index} label={item.text} onChange={onChange('rightColumn', item)} />
              ))}
              <SaveButton onClick={onSave}>Save View</SaveButton>
            </ListColumn>
          </Grid.Column>
        </Grid.Row>
      </GridWrap>
    )
  }
}
FiltersDropdown.propTypes = {
  filters: PropTypes.objectOf(PropTypes.any)
};

export default FiltersDropdown;
