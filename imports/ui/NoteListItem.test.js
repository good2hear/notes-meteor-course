import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {

    it('should render title and timestamp', function () {
      const title = 'My title here';
      const updatedAt = 1518395121865;
      const wrapper = mount( <NoteListItem note={{ title, updatedAt}} />);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('2/12/18');
    });

    it('should render set default title if no title set', function () {
      const updatedAt = 1518395121865;
      const wrapper = mount( <NoteListItem note={{ updatedAt}} />);
      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });

  });
}