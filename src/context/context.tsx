import React, { useState, useEffect } from 'react';
import mockUser from './mockData.tsx/mockUser';
import mockRepos from './mockData.tsx/mockRepos';
import mockFollowers from './mockData.tsx/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
