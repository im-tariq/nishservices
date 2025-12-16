import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CourseListScreen } from '@/screens/services/course_review/CourseListScreen';
import { CourseDetailScreen } from '@/screens/services/course_review/CourseDetailScreen';
import { AddReviewScreen } from '@/screens/services/course_review/AddReviewScreen';
import { colors } from '@/theme';

export type CourseReviewStackParamList = {
    CourseList: undefined;
    CourseDetail: { courseId: string; courseCode: string };
    AddReview: { courseId?: string; courseCode?: string };
};

const Stack = createNativeStackNavigator<CourseReviewStackParamList>();

export const CourseReviewNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.textInverse,
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen
                name="CourseList"
                component={CourseListScreen}
                options={{ title: 'Course Reviewer' }}
            />
            <Stack.Screen
                name="CourseDetail"
                component={CourseDetailScreen}
                options={{ title: 'Course Details' }}
            />
            <Stack.Screen
                name="AddReview"
                component={AddReviewScreen}
                options={{ title: 'Write a Review' }}
            />
        </Stack.Navigator>
    );
};
