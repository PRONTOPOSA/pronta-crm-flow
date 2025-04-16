import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import MonthlyStats from '@/components/dashboard/MonthlyStats';
import ProjectTable from '@/components/dashboard/ProjectTable';
import AppointmentList from '@/components/dashboard/AppointmentList';
import CalendarPreview from '@/components/dashboard/CalendarPreview';
import { useUserManagement } from '@/hooks/useUserManagement';
import { supabase } from '@/integrations/supabase/client';
import { AppointmentType } from '@/components/appointments/types';

const Dashboard = () => {
  const { currentUserProfile } = useUserManagement();
  const isVenditore = currentUserProfile?.ruolo === 'venditore';
  
  const [selectedVenditoreId, setSelectedVenditoreId] = useState<string | undefined>(undefined);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVenditoreId = async () => {
      if (isVenditore && currentUserProfile) {
        const { data: venditoreData } = await supabase
          .from('venditori')
          .select('id')
          .eq('user_id', currentUserProfile.id)
          .single();
        
        if (venditoreData) {
          setSelectedVenditoreId(venditoreData.id);
        }
      }
    };

    fetchVenditoreId();
  }, [isVenditore, currentUserProfile]);

  useEffect(() => {
    const loadAppointments = async () => {
      let query = supabase.from('appuntamenti').select('*');
      
      if (isVenditore && selectedVenditoreId) {
        query = query.eq('venditore_id', selectedVenditoreId);
      }

      const { data } = await query;
      if (data) {
        setAppointments(data);
      }
    };

    loadAppointments();
  }, [isVenditore, selectedVenditoreId]);

  const fetchTodayAppointments = async () => {
    try {
      setIsLoading(true);
      
      // Get today's date in ISO format
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      
      // Create the base query
      let query = supabase
        .from('appuntamenti')
        .select('*')
        .gte('datetime', `${dateStr}T00:00:00`)
        .lt('datetime', `${dateStr}T23:59:59`);
      
      // If user is a venditore, only show their appointments
      if (isVenditore) {
        query = query.eq('venditore_id', currentUserProfile?.id);
      }
      
      // Execute the query
      const { data, error } = await query;
      
      if (data && data.length > 0) {
        const mappedData = data.map(app => ({
          id: app.id,
          title: app.title,
          client: app.client,
          type: app.type as AppointmentType,
          datetime: app.datetime,
          endtime: app.endtime || '',
          location: app.location,
          technician: '', // This field doesn't exist in database, using empty string
          notes: app.notes || '',
          venditoreId: app.venditore_id
        }));
        setTodayAppointments(mappedData);
      } else {
        setTodayAppointments([]);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching today appointments:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayAppointments();
  }, [isVenditore, selectedVenditoreId]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Benvenuto nel pannello di controllo di ProntoPosa</p>
          {isVenditore && currentUserProfile && (
            <p className="mt-1 text-sm bg-blue-50 p-2 rounded border border-blue-100 inline-block">
              Accesso venditore: {currentUserProfile.nome} {currentUserProfile.cognome}
            </p>
          )}
        </div>

        <MonthlyStats />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <AppointmentList 
            appointments={appointments}
            showVenditoreFilter={!isVenditore}
            onVenditoreChange={!isVenditore ? setSelectedVenditoreId : undefined}
            selectedVenditoreId={selectedVenditoreId}
          />
          <ProjectTable projects={projects} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CalendarPreview />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
