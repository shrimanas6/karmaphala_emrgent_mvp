import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '@/lib/mongodb';

// ---------------------------- helpers ----------------------------
const json = (data, status = 200) => NextResponse.json(data, { status });
const err = (message, status = 400) => NextResponse.json({ error: message }, { status });

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

async function getUserFromRequest(req) {
  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return null;
  const db = await getDb();
  const user = await db.collection('users').findOne({ token });
  return user;
}

async function getPath(req) {
  const url = new URL(req.url);
  return url.pathname.replace(/^\/api\/?/, '');
}

// ---------------------------- SEED ----------------------------
const PROFESSIONS = [
  { name: 'Cook', icon: 'ChefHat', category: 'Home' },
  { name: 'Electrician', icon: 'Zap', category: 'Home' },
  { name: 'Plumber', icon: 'Wrench', category: 'Home' },
  { name: 'Carpenter', icon: 'Hammer', category: 'Home' },
  { name: 'Painter', icon: 'PaintBucket', category: 'Home' },
  { name: 'Mechanic', icon: 'Cog', category: 'Auto' },
  { name: 'Driver', icon: 'Car', category: 'Auto' },
  { name: 'Doctor', icon: 'Stethoscope', category: 'Health' },
  { name: 'Nurse', icon: 'HeartPulse', category: 'Health' },
  { name: 'Caregiver', icon: 'Heart', category: 'Health' },
  { name: 'Hospital Assistant', icon: 'BriefcaseMedical', category: 'Health' },
  { name: 'Lawyer', icon: 'Scale', category: 'Professional' },
  { name: 'Engineer', icon: 'Cpu', category: 'Professional' },
  { name: 'Teacher', icon: 'BookOpen', category: 'Professional' },
  { name: 'Home Tutor', icon: 'GraduationCap', category: 'Professional' },
  { name: 'Purohit', icon: 'Flame', category: 'Spiritual' },
  { name: 'Photographer', icon: 'Camera', category: 'Creative' },
  { name: 'Tailor', icon: 'Scissors', category: 'Creative' },
  { name: 'Gardener', icon: 'Trees', category: 'Home' },
  { name: 'Baby Care', icon: 'Baby', category: 'Care' },
  { name: 'Pet Care', icon: 'PawPrint', category: 'Care' },
  { name: 'Senior Citizen Care', icon: 'UserCheck', category: 'Care' },
  { name: 'Computer Expert', icon: 'Laptop', category: 'Tech' },
  { name: 'Technician', icon: 'Settings', category: 'Tech' },
];

const ADDITIONAL_SKILLS = [
  'Kitchen Cleaning', 'Housekeeping', 'Hospital Companion', 'Night Hospital Stay', 'Day Hospital Stay',
  'Medicine Pickup', 'Shopping', 'Temple Visit Companion', 'Walking Assistance', 'Reading Books',
  'Exercise Companion', 'Cooking', 'Laundry', 'Deep Cleaning', 'Event Assistance',
  'Packing', 'Moving', 'Furniture Assembly', 'Computer Setup', 'Online Form Filling',
  'Government Office Visit', 'Passport Assistance', 'Driving'
];

async function seedDemoProviders() {
  const db = await getDb();
  const existing = await db.collection('users').countDocuments({ isDemo: true });
  if (existing > 0) return;
  const base = { lat: 28.5589, lng: 77.2069 }; // Green Park, New Delhi
  const demos = [
    { name: 'Priya Sharma', gender: 'Female', profession: 'Senior Citizen Care', level: 'Expert', rating: 4.9, jobs: 142, price: 400, exp: '6 years', dx: 0.008, dy: 0.005, langs: ['Hindi','English'] },
    { name: 'Ramesh Kumar', gender: 'Male', profession: 'Electrician', level: 'Expert', rating: 4.8, jobs: 210, price: 350, exp: '10 years', dx: -0.010, dy: 0.007, langs: ['Hindi','Punjabi'] },
    { name: 'Anita Rao', gender: 'Female', profession: 'Cook', level: 'Explorer', rating: 4.7, jobs: 89, price: 300, exp: '4 years', dx: 0.005, dy: -0.008, langs: ['Hindi','Tamil','English'] },
    { name: 'Vikram Singh', gender: 'Male', profession: 'Plumber', level: 'Expert', rating: 4.6, jobs: 156, price: 300, exp: '8 years', dx: -0.006, dy: -0.012, langs: ['Hindi'] },
    { name: 'Dr. Meera Nair', gender: 'Female', profession: 'Doctor', level: 'Expert', rating: 4.95, jobs: 320, price: 800, exp: '15 years', dx: 0.015, dy: 0.010, langs: ['English','Malayalam'] },
    { name: 'Suresh Yadav', gender: 'Male', profession: 'Driver', level: 'Explorer', rating: 4.5, jobs: 78, price: 250, exp: '5 years', dx: 0.020, dy: -0.005, langs: ['Hindi'] },
    { name: 'Kavita Iyer', gender: 'Female', profession: 'Hospital Assistant', level: 'Expert', rating: 4.85, jobs: 118, price: 500, exp: '7 years', dx: -0.003, dy: 0.014, langs: ['Hindi','English','Tamil'] },
    { name: 'Arjun Verma', gender: 'Male', profession: 'Carpenter', level: 'Scout', rating: 4.4, jobs: 34, price: 320, exp: '2 years', dx: 0.011, dy: -0.015, langs: ['Hindi'] },
    { name: 'Neha Gupta', gender: 'Female', profession: 'Nurse', level: 'Expert', rating: 4.9, jobs: 201, price: 600, exp: '9 years', dx: -0.014, dy: -0.003, langs: ['Hindi','English'] },
    { name: 'Rakesh Pandit', gender: 'Male', profession: 'Purohit', level: 'Expert', rating: 4.95, jobs: 260, price: 1500, exp: '20 years', dx: 0.002, dy: 0.018, langs: ['Sanskrit','Hindi'] },
    { name: 'Sunita Devi', gender: 'Female', profession: 'Caregiver', level: 'Expert', rating: 4.88, jobs: 175, price: 450, exp: '11 years', dx: -0.017, dy: 0.008, langs: ['Hindi','Bengali'] },
    { name: 'Amit Rathi', gender: 'Male', profession: 'Computer Expert', level: 'Expert', rating: 4.7, jobs: 95, price: 500, exp: '6 years', dx: 0.006, dy: 0.020, langs: ['English','Hindi'] },
  ];
  const providers = demos.map(d => ({
    id: uuidv4(),
    isDemo: true,
    name: d.name,
    mobile: '+91 9' + Math.floor(100000000 + Math.random()*899999999),
    gender: d.gender,
    foodPref: Math.random() > 0.5 ? 'Veg' : 'Non Veg',
    createdAt: new Date(),
    profile: {
      mode: 'provider',
      isProviderVerified: true,
      isOnline: true,
      karmaPoints: Math.floor(500 + Math.random()*2000),
    },
    provider: {
      profession: d.profession,
      level: d.level,
      rating: d.rating,
      completedJobs: d.jobs,
      pricePerHour: d.price,
      experience: d.exp,
      languages: d.langs,
      additionalSkills: [ADDITIONAL_SKILLS[Math.floor(Math.random()*ADDITIONAL_SKILLS.length)], ADDITIONAL_SKILLS[Math.floor(Math.random()*ADDITIONAL_SKILLS.length)]],
      address: 'Green Park, New Delhi',
      location: { lat: base.lat + d.dy, lng: base.lng + d.dx },
      locationUpdatedAt: new Date(),
      avatarSeed: d.name.charCodeAt(0),
    }
  }));
  await db.collection('users').insertMany(providers);
}

// ---------------------------- ROUTES ----------------------------
async function handler(req) {
  try {
    const path = await getPath(req);
    const method = req.method;
    const db = await getDb();
    await seedDemoProviders();

    // GET /api/health
    if (path === 'health' && method === 'GET') return json({ ok: true, service: 'KarmaPhala' });

    // GET /api/meta -> professions & skills
    if (path === 'meta' && method === 'GET') {
      return json({ professions: PROFESSIONS, additionalSkills: ADDITIONAL_SKILLS });
    }

    // POST /api/auth/send-otp  { mobile }
    if (path === 'auth/send-otp' && method === 'POST') {
      const { mobile } = await req.json();
      if (!mobile || mobile.replace(/\D/g,'').length < 10) return err('Invalid mobile');
      const code = String(Math.floor(100000 + Math.random()*900000));
      await db.collection('otps').updateOne(
        { mobile },
        { $set: { mobile, code, createdAt: new Date(), expiresAt: new Date(Date.now()+5*60*1000) } },
        { upsert: true }
      );
      // Return code in demo mode
      return json({ success: true, demoOtp: code, message: 'OTP sent (demo mode — code shown for testing)' });
    }

    // POST /api/auth/verify-otp  { mobile, code }
    if (path === 'auth/verify-otp' && method === 'POST') {
      const { mobile, code } = await req.json();
      const record = await db.collection('otps').findOne({ mobile });
      if (!record) return err('OTP not found. Please request again.');
      if (record.expiresAt < new Date()) return err('OTP expired');
      if (record.code !== code) return err('Invalid OTP');
      // Find or create user
      let user = await db.collection('users').findOne({ mobile, isDemo: { $ne: true } });
      const token = uuidv4();
      if (!user) {
        user = {
          id: uuidv4(), mobile, token, createdAt: new Date(),
          profile: { mode: 'customer', isProviderVerified: false, isOnline: false, karmaPoints: 0 },
          needsRegistration: true,
        };
        await db.collection('users').insertOne(user);
      } else {
        await db.collection('users').updateOne({ id: user.id }, { $set: { token } });
        user.token = token;
      }
      await db.collection('otps').deleteOne({ mobile });
      return json({ success: true, token, user: sanitize(user), needsRegistration: !user.name });
    }

    // POST /api/user/register  (complete profile)
    if (path === 'user/register' && method === 'POST') {
      const user = await getUserFromRequest(req);
      if (!user) return err('Unauthorized', 401);
      const body = await req.json();
      const { name, email, gender, foodPref, agreeTerms } = body;
      if (!name || !gender || !foodPref || !agreeTerms) return err('Missing required fields');
      await db.collection('users').updateOne({ id: user.id }, { $set: { name, email: email||null, gender, foodPref, needsRegistration: false } });
      const updated = await db.collection('users').findOne({ id: user.id });
      return json({ success: true, user: sanitize(updated) });
    }

    // GET /api/user/me
    if (path === 'user/me' && method === 'GET') {
      const user = await getUserFromRequest(req);
      if (!user) return err('Unauthorized', 401);
      return json({ user: sanitize(user) });
    }

    // POST /api/user/switch-mode  { mode: 'customer'|'provider' }
    if (path === 'user/switch-mode' && method === 'POST') {
      const user = await getUserFromRequest(req);
      if (!user) return err('Unauthorized', 401);
      const { mode } = await req.json();
      if (!['customer','provider'].includes(mode)) return err('Invalid mode');
      await db.collection('users').updateOne({ id: user.id }, { $set: { 'profile.mode': mode } });
      const updated = await db.collection('users').findOne({ id: user.id });
      return json({ success: true, user: sanitize(updated) });
    }

    // POST /api/provider/setup  { profession, level, pricePerHour, experience, languages, additionalSkills, address, location }
    if (path === 'provider/setup' && method === 'POST') {
      const user = await getUserFromRequest(req);
      if (!user) return err('Unauthorized', 401);
      const body = await req.json();
      const provider = {
        profession: body.profession,
        level: body.level || 'Scout',
        pricePerHour: Number(body.pricePerHour) || 300,
        experience: body.experience || '1 year',
        languages: body.languages || ['Hindi'],
        additionalSkills: body.additionalSkills || [],
        address: body.address || '',
        location: body.location || { lat: 28.5589, lng: 77.2069 },
        locationUpdatedAt: new Date(),
        rating: 4.5,
        completedJobs: 0,
      };
      await db.collection('users').updateOne(
        { id: user.id },
        { $set: { provider, 'profile.isProviderVerified': true, 'profile.mode': 'provider' } }
      );
      const updated = await db.collection('users').findOne({ id: user.id });
      return json({ success: true, user: sanitize(updated) });
    }

    // POST /api/provider/toggle-online { online }
    if (path === 'provider/toggle-online' && method === 'POST') {
      const user = await getUserFromRequest(req);
      if (!user) return err('Unauthorized', 401);
      const { online } = await req.json();
      await db.collection('users').updateOne({ id: user.id }, { $set: { 'profile.isOnline': !!online } });
      return json({ success: true, online: !!online });
    }

    // POST /api/provider/location  { lat, lng }
    if (path === 'provider/location' && method === 'POST') {
      const user = await getUserFromRequest(req);
      if (!user) return err('Unauthorized', 401);
      const { lat, lng } = await req.json();
      await db.collection('users').updateOne({ id: user.id }, { $set: { 'provider.location': { lat, lng }, 'provider.locationUpdatedAt': new Date() } });
      return json({ success: true });
    }

    // GET /api/providers/search?lat=&lng=&radius=&profession=&gender=
    if (path === 'providers/search' && method === 'GET') {
      const url = new URL(req.url);
      const lat = parseFloat(url.searchParams.get('lat') || '28.5589');
      const lng = parseFloat(url.searchParams.get('lng') || '77.2069');
      const radius = parseFloat(url.searchParams.get('radius') || '5');
      const profession = url.searchParams.get('profession');
      const gender = url.searchParams.get('gender');
      const q = { 'profile.isProviderVerified': true, 'profile.isOnline': true, provider: { $exists: true } };
      if (profession && profession !== 'All') q['provider.profession'] = profession;
      if (gender && gender !== 'Any') q.gender = gender;
      const providers = await db.collection('users').find(q).toArray();
      const results = providers
        .map(p => {
          const dist = haversineKm(lat, lng, p.provider.location.lat, p.provider.location.lng);
          return {
            id: p.id,
            name: p.name,
            gender: p.gender,
            profession: p.provider.profession,
            level: p.provider.level,
            rating: p.provider.rating,
            completedJobs: p.provider.completedJobs,
            pricePerHour: p.provider.pricePerHour,
            experience: p.provider.experience,
            languages: p.provider.languages,
            additionalSkills: p.provider.additionalSkills,
            distanceKm: Math.round(dist * 10) / 10,
            etaMinutes: Math.max(3, Math.round(dist * 6)),
            karmaPoints: p.profile.karmaPoints || 0,
            isOnline: true,
            isVerified: true,
            location: p.provider.location,
          };
        })
        .filter(p => p.distanceKm <= radius)
        .sort((a,b) => a.distanceKm - b.distanceKm || b.rating - a.rating);
      return json({ results, count: results.length, center: { lat, lng }, radiusKm: radius });
    }

    // POST /api/bookings/create { providerId, service, notes, customerLocation }
    if (path === 'bookings/create' && method === 'POST') {
      const user = await getUserFromRequest(req);
      if (!user) return err('Unauthorized', 401);
      const { providerId, service, notes, customerLocation, duration } = await req.json();
      const provider = await db.collection('users').findOne({ id: providerId });
      if (!provider) return err('Provider not found');
      const booking = {
        id: uuidv4(),
        customerId: user.id,
        customerName: user.name,
        customerMobile: user.mobile,
        providerId,
        providerName: provider.name,
        providerProfession: provider.provider?.profession,
        service: service || provider.provider?.profession,
        notes: notes || '',
        duration: duration || '2 hours',
        pricePerHour: provider.provider?.pricePerHour || 300,
        customerLocation: customerLocation || { lat: 28.5589, lng: 77.2069 },
        providerLocation: provider.provider?.location,
        status: 'pending', // pending -> accepted / rejected -> started -> completed / cancelled
        startOtp: null,
        endOtp: null,
        startedAt: null,
        completedAt: null,
        rating: null,
        review: null,
        karmaAwarded: false,
        createdAt: new Date(),
      };
      await db.collection('bookings').insertOne(booking);
      // Auto-accept demo providers after short delay simulation — return quickly; we'll auto accept on poll
      return json({ success: true, booking });
    }

    // GET /api/bookings/list  ?role=customer|provider
    if (path === 'bookings/list' && method === 'GET') {
      const user = await getUserFromRequest(req);
      if (!user) return err('Unauthorized', 401);
      const url = new URL(req.url);
      const role = url.searchParams.get('role') || user.profile?.mode || 'customer';
      const q = role === 'provider' ? { providerId: user.id } : { customerId: user.id };
      const list = await db.collection('bookings').find(q).sort({ createdAt: -1 }).toArray();
      return json({ bookings: list.map(({ _id, ...b }) => b) });
    }

    // GET /api/bookings/:id
    if (path.startsWith('bookings/') && method === 'GET') {
      const parts = path.split('/');
      const bid = parts[1];
      if (parts.length === 2) {
        const booking = await db.collection('bookings').findOne({ id: bid });
        if (!booking) return err('Not found', 404);
        // Auto-accept demo provider bookings after 2 seconds
        const provider = await db.collection('users').findOne({ id: booking.providerId });
        if (provider?.isDemo && booking.status === 'pending' && (new Date() - new Date(booking.createdAt)) > 2000) {
          await db.collection('bookings').updateOne({ id: bid }, { $set: { status: 'accepted', acceptedAt: new Date() } });
          booking.status = 'accepted';
        }
        const { _id, ...rest } = booking;
        return json({ booking: rest });
      }
    }

    // POST /api/bookings/:id/accept
    if (path.match(/^bookings\/[^/]+\/accept$/) && method === 'POST') {
      const bid = path.split('/')[1];
      const user = await getUserFromRequest(req);
      if (!user) return err('Unauthorized', 401);
      await db.collection('bookings').updateOne({ id: bid, providerId: user.id }, { $set: { status: 'accepted', acceptedAt: new Date() } });
      return json({ success: true });
    }

    // POST /api/bookings/:id/reject
    if (path.match(/^bookings\/[^/]+\/reject$/) && method === 'POST') {
      const bid = path.split('/')[1];
      const user = await getUserFromRequest(req);
      if (!user) return err('Unauthorized', 401);
      await db.collection('bookings').updateOne({ id: bid, providerId: user.id }, { $set: { status: 'rejected', rejectedAt: new Date() } });
      return json({ success: true });
    }

    // POST /api/bookings/:id/start-otp  (customer generates)
    if (path.match(/^bookings\/[^/]+\/start-otp$/) && method === 'POST') {
      const bid = path.split('/')[1];
      const otp = String(Math.floor(1000 + Math.random()*9000));
      await db.collection('bookings').updateOne({ id: bid }, { $set: { startOtp: otp } });
      return json({ success: true, otp });
    }

    // POST /api/bookings/:id/verify-start  { otp }
    if (path.match(/^bookings\/[^/]+\/verify-start$/) && method === 'POST') {
      const bid = path.split('/')[1];
      const { otp } = await req.json();
      const booking = await db.collection('bookings').findOne({ id: bid });
      if (!booking) return err('Not found', 404);
      if (booking.startOtp !== otp) return err('Invalid OTP');
      await db.collection('bookings').updateOne({ id: bid }, { $set: { status: 'started', startedAt: new Date() } });
      return json({ success: true });
    }

    // POST /api/bookings/:id/end-otp
    if (path.match(/^bookings\/[^/]+\/end-otp$/) && method === 'POST') {
      const bid = path.split('/')[1];
      const otp = String(Math.floor(1000 + Math.random()*9000));
      await db.collection('bookings').updateOne({ id: bid }, { $set: { endOtp: otp } });
      return json({ success: true, otp });
    }

    // POST /api/bookings/:id/verify-end  { otp }
    if (path.match(/^bookings\/[^/]+\/verify-end$/) && method === 'POST') {
      const bid = path.split('/')[1];
      const { otp } = await req.json();
      const booking = await db.collection('bookings').findOne({ id: bid });
      if (!booking) return err('Not found', 404);
      if (booking.endOtp !== otp) return err('Invalid OTP');
      const totalHours = booking.duration?.includes('hour') ? parseInt(booking.duration) || 2 : 2;
      const amount = (booking.pricePerHour || 300) * totalHours;
      await db.collection('bookings').updateOne(
        { id: bid },
        { $set: { status: 'completed', completedAt: new Date(), amount } }
      );
      // Award karma points to both
      const kp = 25;
      await db.collection('users').updateOne({ id: booking.customerId }, { $inc: { 'profile.karmaPoints': kp } });
      await db.collection('users').updateOne({ id: booking.providerId }, { $inc: { 'profile.karmaPoints': kp, 'provider.completedJobs': 1 } });
      await db.collection('bookings').updateOne({ id: bid }, { $set: { karmaAwarded: true } });
      return json({ success: true, amount, karmaAwarded: kp });
    }

    // POST /api/bookings/:id/rate  { rating, review }
    if (path.match(/^bookings\/[^/]+\/rate$/) && method === 'POST') {
      const bid = path.split('/')[1];
      const { rating, review } = await req.json();
      await db.collection('bookings').updateOne({ id: bid }, { $set: { rating: Number(rating), review: review || '' } });
      return json({ success: true });
    }

    return err('Route not found: ' + path, 404);
  } catch (e) {
    console.error('API error:', e);
    return err(e.message || 'Server error', 500);
  }
}

function sanitize(user) {
  if (!user) return null;
  const { _id, ...rest } = user;
  return rest;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
