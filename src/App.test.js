import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from './login/AuthContext';
import App from './App';

test('renders login button and switches language', () => {
  // App innerhalb des AuthProviders rendern
  render(
      <AuthProvider>
        <App />
      </AuthProvider>
  );

  // Überprüfe, ob der Login-Button angezeigt wird
  const loginButton = screen.getByText(/login with google/i);
  expect(loginButton).toBeInTheDocument();

  // Simuliere einen Klick auf den Sprache umschalten-Button (von EN zu DE)
  const languageSelect = screen.getByLabelText(/language/i);
  fireEvent.change(languageSelect, { target: { value: 'de' } });

  // Überprüfe, ob die Labels nach dem Umschalten auf Deutsch angezeigt werden
  const logoutButton = screen.queryByText(/abmelden/i);
  expect(logoutButton).not.toBeInTheDocument(); // Sicherstellen, dass Logout nicht angezeigt wird

  // Hier kannst du weitere Logik zum Testen der deutschen Sprache hinzufügen, sobald der Benutzer eingeloggt ist
});

test('logs in user and shows MainNavbar with logout button', () => {
  // Fake user data
  const fakeUser = { name: 'John Doe', email: 'john.doe@example.com' };

  // Überschreibe den useContext-Hook, um den Login-Prozess zu simulieren
  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    user: fakeUser,
    login: jest.fn(),
    logout: jest.fn(),
  }));

  // App rendern
  render(
      <AuthProvider>
        <App />
      </AuthProvider>
  );

  // Überprüfe, ob das MainNavbar mit dem Logout-Button angezeigt wird
  const logoutButton = screen.getByText(/logout/i);
  expect(logoutButton).toBeInTheDocument();

  // Simuliere einen Klick auf den Logout-Button
  fireEvent.click(logoutButton);

  // Nach dem Logout sollte der Login-Button wieder angezeigt werden
  const loginButton = screen.getByText(/login with google/i);
  expect(loginButton).toBeInTheDocument();
});
