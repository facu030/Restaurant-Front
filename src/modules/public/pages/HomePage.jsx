import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import useAuth from '../../auth/hook/useAuth';

export default function HomePage() {
  return (
    <div>
      <Hero />
    </div>
  );
}