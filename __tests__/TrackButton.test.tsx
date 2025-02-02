import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import {TrackButton} from '@/components/TrackButton';
import { Ad } from '@/lib/types/ad';

jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
        info: jest.fn(),
    },
}));

jest.mock('lucide-react', () => ({
    Star: jest.fn(() => <div data-testid="star-icon" />),
}));

const mockStore = configureStore([]);

describe('TrackButton Component', () => {
    const ad: Ad = {
        ad_id: 123,
        name: 'Test Ad',
    };

    it('renders the TrackButton correctly when not tracked', () => {
        const store = mockStore({
            ads: {
                trackedAds: {},
            },
        });

        render(
            <Provider store={store}>
                <TrackButton ad={ad} disabled={false} />
            </Provider>
        );

        // Check if the button is rendered
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        // Check if the Star icon is rendered with the correct class
        const starIcon = screen.getByTestId('star-icon');
        expect(starIcon).toHaveClass('untracked');
    });

    it('renders the TrackButton correctly when tracked', () => {
        const store = mockStore({
            ads: {
                trackedAds: { [ad.ad_id]: true },
            },
        });

        render(
            <Provider store={store}>
                <TrackButton ad={ad} disabled={false} />
            </Provider>
        );

        // Check if the Star icon is rendered with the correct class
        const starIcon = screen.getByTestId('star-icon');
        expect(starIcon).toHaveClass('tracked');
    });

    it('calls toggleTracking and shows toast when clicked', () => {
        const store = mockStore({
            ads: {
                trackedAds: {},
            },
        });

        render(
            <Provider store={store}>
                <TrackButton ad={ad} disabled={false} />
            </Provider>
        );

        // Simulate a button click
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Check if the toggleTracking action was dispatched
        const actions = store.getActions();
        expect(actions).toEqual([{ type: 'ads/toggleTracking', payload: ad }]);

        // Check if the toast was called with the correct message
        expect(toast.success).toHaveBeenCalledWith('Zapracen oglas ', {
            description: ad.name,
        });
    });

    it('does not call toggleTracking or show toast when disabled', () => {
        const store = mockStore({
            ads: {
                trackedAds: {},
            },
        });

        render(
            <Provider store={store}>
                <TrackButton ad={ad} disabled={true} />
            </Provider>
        );

        // Simulate a button click
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Ensure no actions were dispatched
        const actions = store.getActions();
        expect(actions).toEqual([]);

        // Ensure no toast was called
        expect(toast.success).not.toHaveBeenCalled();
        expect(toast.info).not.toHaveBeenCalled();
    });
});