import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Grid, Checkbox } from 'semantic-ui-react';
import {
  ListColumn,
  GridWrap,
  RadioWrap
} from "./styles";

class ChatFilters extends Component {
  render() {
    const { filters = {}, onChange, onChangeAll, all } = this.props;

    return (
      <GridWrap>
        <Grid.Row style={{paddingTop: 0}}>
          <Grid.Column width={8}>
            <ListColumn>
              <RadioWrap radio checked={all > 0} indeterminate={all === 0} label="ALL" onChange={onChangeAll} />
              {map(filters.leftColumn, (item, index) => (
                <RadioWrap radio checked={item.value} key={index} label={item.text} onChange={onChange('leftColumn', item)} />
              ))}
            </ListColumn>
          </Grid.Column>
          <Grid.Column width={8}>
            <ListColumn>
              {map(filters.rightColumn, (item, index) => (
                <RadioWrap radio checked={item.value} key={index} label={item.text} onChange={onChange('rightColumn', item)} />
              ))}
            </ListColumn>
          </Grid.Column>
        </Grid.Row>
      </GridWrap>
    )
  }
}
ChatFilters.propTypes = {
  filters: PropTypes.objectOf(PropTypes.any)
};

export default ChatFilters;
