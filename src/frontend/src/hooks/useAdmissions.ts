import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { OnlineAdmission, Inquiry, Address } from '@/backend';
import { ExternalBlob } from '@/backend';

export function useSubmitAdmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      aadhaar: string;
      heightCm: number;
      weightKg: number;
      medicalHistory: string;
      address: Address;
      packageSelected: string;
      paymentMode: string;
      photo: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitAdmission(
        data.name,
        data.aadhaar,
        data.heightCm,
        data.weightKg,
        data.medicalHistory,
        data.address,
        data.packageSelected,
        data.paymentMode,
        data.photo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admissions'] });
    },
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      serviceInterested: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitInquiry(
        data.name,
        data.phone,
        data.serviceInterested,
        data.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

export function useGetAllAdmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<OnlineAdmission[]>({
    queryKey: ['admissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAdmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<Inquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
