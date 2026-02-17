
import React from 'react';

export interface GuestData {
  id?: string; // Unique ID for storage
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
  nationality: string;
  birthday: string;
  travelingFrom: string;
  travelingNext: string;
  checkInDate: string;
  checkOutDate: string;
  acceptedAt?: string;
  signature?: string;
}

export interface Rule {
  id: string;
  title: string;
  subtitle: string;
  descriptionEs: string;
  descriptionEn: string;
  // Use React.ReactNode which requires importing React
  icon: React.ReactNode;
  color: string;
}

export type AppStep = 'welcome' | 'registration' | 'rules' | 'signature' | 'confirmation' | 'history';
