import { useCallback } from "react";

// Analytics hook para tracking de eventos
// En producción se integraría con Google Analytics, Mixpanel, etc.

interface AnalyticsEvent {
  type: 'page_view' | 'search' | 'click_card' | 'filter_applied' | 'form_submit';
  properties?: Record<string, any>;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];

  track(type: AnalyticsEvent['type'], properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      type,
      properties: {
        timestamp: new Date().toISOString(),
        ...properties,
      },
    };

    this.events.push(event);

    // En mock mode, solo guardamos localmente
    if (import.meta.env.USE_MOCKS === 'true') {
      console.log('[Analytics]', event);
      return;
    }

    // En producción, enviar a backend/servicio de analytics
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) });
  }

  getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  clearEvents() {
    this.events = [];
  }
}

const analyticsService = new AnalyticsService();

export const useAnalytics = () => {
  const trackPageView = useCallback((page: string) => {
    analyticsService.track('page_view', { page });
  }, []);

  const trackSearch = useCallback((query: string, resultsCount: number) => {
    analyticsService.track('search', { query, resultsCount });
  }, []);

  const trackCardClick = useCallback((cardType: 'place' | 'event', cardId: string, cardName: string) => {
    analyticsService.track('click_card', { cardType, cardId, cardName });
  }, []);

  const trackFilterApplied = useCallback((filters: Record<string, any>) => {
    analyticsService.track('filter_applied', { filters });
  }, []);

  const trackFormSubmit = useCallback((formName: string, success: boolean) => {
    analyticsService.track('form_submit', { formName, success });
  }, []);

  return {
    trackPageView,
    trackSearch,
    trackCardClick,
    trackFilterApplied,
    trackFormSubmit,
    getEvents: analyticsService.getEvents.bind(analyticsService),
    clearEvents: analyticsService.clearEvents.bind(analyticsService),
  };
};
