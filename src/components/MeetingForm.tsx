import React, { ChangeEvent, FC, FormEvent, useState } from 'react';

import {
  Flex,
  FormField,
  Input,
  PrimaryButton,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react';
import { addAttendeeToDB, addMeetingToDB, createMeeting, getAttendeeFromDB, getMeetingFromDB, joinMeeting } from '../utils/api';

const MeetingForm: FC = () => {
  const meetingManager = useMeetingManager();
  const [meetingTitle, setMeetingTitle] = useState('');
  const [attendeeName, setName] = useState('');

  function getAttendeeCallback() {
    return async (chimeAttendeeId: string, externalUserId?: string) => {
      const attendeeInfo: any = await getAttendeeFromDB(chimeAttendeeId);
      const attendeeData = attendeeInfo.data.getAttendee;
      return {
        name: attendeeData.name
      };
    }
  }

//Placeholder - we'll replace this function implementation later
  const clickedJoinMeeting = async (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form>
      <FormField
        field={Input}     
        label='Meeting Id'
        value={meetingTitle}
        fieldProps={{
          name: 'Meeting Id',
          placeholder: 'Enter a Meeting ID',
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setMeetingTitle(e.target.value);
        }}
      />
      <FormField
        field={Input}
        label="Name"
        value={attendeeName}
        fieldProps={{
          name: 'Name',
          placeholder: 'Enter your Attendee Name'
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      />
      <Flex
        container
        layout="fill-space-centered"
        style={{ marginTop: '2.5rem' }}
      >
          <PrimaryButton label="Join Meeting" onClick={clickedJoinMeeting} />
      </Flex>
    </form>
  );
};

export default MeetingForm;
