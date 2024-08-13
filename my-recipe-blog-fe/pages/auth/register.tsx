import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('User');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log('name', name);
      const req = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });
      const data = await req.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Name'
        required
      />
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        required
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value='admin'>Admin</option>
        <option value='user'>User</option>
      </select>
      <button type='submit' disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Register;
